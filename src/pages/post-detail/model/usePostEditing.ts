'use client'

import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { type TPost, useUpdatePostMutation } from '@/entities/post'

import { getApiErrorMessage } from '@/shared/api'

import { lostLockMessage } from '../lib/lockMessages'
import { postFormSchema, type TPostFormValues } from './postFormSchema'
import type { TPostLock } from './usePostLock'

const RENEW_INTERVAL_MS = 60_000

export function usePostEditing(
	post: TPost | null | undefined,
	lock: TPostLock,
) {
	const [isEditing, setIsEditing] = useState(false)

	const [isStarting, setIsStarting] = useState(false)

	const [startError, setStartError] = useState<string | null>(null)

	const form = useForm<TPostFormValues>({
		resolver: zodResolver(postFormSchema),
		defaultValues: { title: '', description: '' },
	})

	const { mutate, isPending: isSaving, error, reset } = useUpdatePostMutation()

	const { renew } = lock

	useEffect(() => {
		if (!isEditing) return

		let lastRenewAt = Date.now()

		return form.subscribe({
			formState: { values: true },
			callback: () => {
				if (Date.now() - lastRenewAt < RENEW_INTERVAL_MS) return

				lastRenewAt = Date.now()
				renew()
			},
		})
	}, [isEditing, form, renew])

	const start = async () => {
		if (!post) return

		setIsStarting(true)
		setStartError(null)

		const lockError = await lock.acquire()

		setIsStarting(false)

		if (lockError) {
			setStartError(lockError)
			return
		}

		form.reset({ title: post.title, description: post.description ?? '' })
		reset()
		setIsEditing(true)
	}

	const cancel = () => {
		lock.release()
		setIsEditing(false)
	}

	const submit = form.handleSubmit(values => {
		if (!post || !lock.token) return

		mutate(
			{
				id: post.id,
				lockToken: lock.token,
				values: {
					title: values.title,
					description: values.description || null,
				},
			},
			{ onSuccess: () => setIsEditing(false) },
		)
	})

	const errorMessage = error
		? getApiErrorMessage(error, 'Your changes weren’t saved. Try again.')
		: lostLockMessage(lock.lostReason)

	return {
		isEditing,
		isStarting,
		startError,
		register: form.register,
		errors: form.formState.errors,
		isSaving,
		canSave: !!lock.token,
		errorMessage,
		start,
		cancel,
		submit,
	}
}

export type TPostEditing = ReturnType<typeof usePostEditing>
