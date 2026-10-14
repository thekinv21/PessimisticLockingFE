import { io, type Socket } from 'socket.io-client'

import { SOCKET_URL } from '@/shared/config'

import { getLockToken } from './getLockToken'

export const LOCK_EVENT = {
	watch: 'lock:watch',
	unwatch: 'lock:unwatch',
	acquire: 'lock:acquire',
	renew: 'lock:renew',
	release: 'lock:release',
	acquired: 'lock:acquired',
	released: 'lock:released',
	recordChanged: 'record:changed',
} as const

export const POST_RESOURCE = 'post'

export type TLockTarget = { resource: string; id: string }

type TLockHolder = { userId: string; fullName: string }

export type TEditLock = TLockTarget & {
	holder: TLockHolder
	acquiredAt: string
	expiresAt: string
}

export type TLockGrant = TEditLock & { token: string }

export type TLockReleaseReason =
	'released' | 'saved' | 'expired' | 'disconnected' | 'deleted'

export type TLockReleased = TLockTarget & { reason: TLockReleaseReason }

export type TRecordChanged = TLockTarget & {
	action: 'updated' | 'deleted'
	by: TLockHolder
	at: string
}

export type TLockAck<T = undefined> =
	{ ok: true; data: T } | { ok: false; error: string; lock?: TEditLock }

export type TLockSocket = Socket

export const createLockSocket = (): TLockSocket =>
	io(`${SOCKET_URL}/locks`, {
		autoConnect: false,
		transports: ['websocket'],
		auth: callback => {
			void getLockToken().then(token => callback({ token }))
		},
	})
