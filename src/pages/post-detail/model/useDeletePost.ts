'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { isAxiosError } from 'axios'

import { useDeletePostMutation } from '@/entities/post'

import type { TApiErrorResponse } from '@/shared/api'
import { ROUTES } from '@/shared/routes'

const HTTP_LOCKED = 423

const FALLBACK_MESSAGE = 'The post wasn’t deleted. Try again.'

function toErrorMessage(error: Error) {
	if (!isAxiosError<TApiErrorResponse>(error)) return FALLBACK_MESSAGE

	if (error.response?.status === HTTP_LOCKED) {
		return 'Someone is editing this post right now. Delete it once they finish.'
	}

	return error.response?.data.message ?? FALLBACK_MESSAGE
}

export function useDeletePost(id: number) {
	const [isOpen, setIsOpen] = useState(false)

	const router = useRouter()

	const { mutate, isPending, error, reset } = useDeletePostMutation()

	const open = () => {
		reset()
		setIsOpen(true)
	}

	const close = () => setIsOpen(false)

	const confirm = () =>
		mutate(id, { onSuccess: () => router.replace(ROUTES.home) })

	return {
		isOpen,
		open,
		close,
		confirm,
		isPending,
		errorMessage: error ? toErrorMessage(error) : null,
	}
}

export type TDeletePost = ReturnType<typeof useDeletePost>
