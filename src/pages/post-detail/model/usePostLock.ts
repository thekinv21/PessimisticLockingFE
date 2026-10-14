'use client'

import { useEffect, useRef, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { postKeys } from '@/entities/post'

import {
	LOCK_EVENT,
	POST_RESOURCE,
	type TEditLock,
	type TLockAck,
	type TLockGrant,
	type TLockReleased,
	type TLockReleaseReason,
	type TLockSocket,
	type TLockTarget,
	type TRecordChanged,
} from '../api/lockSocket'
import { toInitials } from '../lib/toInitials'

const ACK_TIMEOUT_MS = 5_000

const WATCH_TARGET = { resource: POST_RESOURCE }

export function usePostLock(postId: number, socket: TLockSocket) {
	const queryClient = useQueryClient()

	const [lock, setLock] = useState<TEditLock | null>(null)

	const [token, setToken] = useState<string | null>(null)

	const [lostReason, setLostReason] = useState<TLockReleaseReason | null>(null)

	const [deletedBy, setDeletedBy] = useState<string | null>(null)

	const tokenRef = useRef<string | null>(null)

	const target = { resource: POST_RESOURCE, id: String(postId) }

	useEffect(() => {
		const isThisPost = (payload: TLockTarget) =>
			payload.resource === POST_RESOURCE && payload.id === String(postId)

		const watch = async () => {
			const ack: TLockAck<TEditLock[]> = await socket.emitWithAck(
				LOCK_EVENT.watch,
				WATCH_TARGET,
			)

			if (ack.ok) setLock(ack.data.find(isThisPost) ?? null)
		}

		const onAcquired = (next: TEditLock) => {
			if (isThisPost(next)) setLock(next)
		}

		const onReleased = (released: TLockReleased) => {
			if (!isThisPost(released)) return

			setLock(null)

			if (!tokenRef.current) return

			tokenRef.current = null
			setToken(null)
			setLostReason(released.reason === 'saved' ? null : released.reason)
		}

		const onDisconnect = () => {
			if (!tokenRef.current) return

			tokenRef.current = null
			setToken(null)
			setLostReason('disconnected')
		}

		const onRecordChanged = (change: TRecordChanged) => {
			if (!isThisPost(change)) return

			if (change.action === 'deleted') {
				setDeletedBy(change.by.fullName)
				return
			}

			void queryClient.invalidateQueries({ queryKey: postKeys.detail(postId) })
		}

		socket.on('connect', watch)
		socket.on('disconnect', onDisconnect)
		socket.on(LOCK_EVENT.acquired, onAcquired)
		socket.on(LOCK_EVENT.released, onReleased)
		socket.on(LOCK_EVENT.recordChanged, onRecordChanged)

		if (socket.connected) void watch()

		return () => {
			socket.off('connect', watch)
			socket.off('disconnect', onDisconnect)
			socket.off(LOCK_EVENT.acquired, onAcquired)
			socket.off(LOCK_EVENT.released, onReleased)
			socket.off(LOCK_EVENT.recordChanged, onRecordChanged)

			if (socket.connected) socket.emit(LOCK_EVENT.unwatch, WATCH_TARGET)
		}
	}, [socket, postId, queryClient])

	const acquire = async () => {
		if (!socket.connected) {
			return 'The live connection isn’t ready yet. Try again in a moment.'
		}

		try {
			const ack: TLockAck<TLockGrant> = await socket
				.timeout(ACK_TIMEOUT_MS)
				.emitWithAck(LOCK_EVENT.acquire, target)

			if (!ack.ok) return ack.error

			tokenRef.current = ack.data.token
			setToken(ack.data.token)
			setLostReason(null)
			setLock(ack.data)

			return null
		} catch {
			return 'The server didn’t answer. Try again in a moment.'
		}
	}

	const release = () => {
		if (tokenRef.current) socket.emit(LOCK_EVENT.release, target)

		tokenRef.current = null
		setToken(null)
		setLostReason(null)
	}

	const renew = () => {
		if (tokenRef.current) socket.emit(LOCK_EVENT.renew, target)
	}

	const lockedBy = lock && !token ? lock.holder.fullName : null

	return {
		token,
		lockedBy,
		lockedByInitials: lockedBy ? toInitials(lockedBy) : null,
		lostReason,
		deletedBy,
		acquire,
		release,
		renew,
	}
}

export type TPostLock = ReturnType<typeof usePostLock>
