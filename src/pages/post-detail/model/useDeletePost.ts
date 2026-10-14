'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useDeletePostMutation } from '@/entities/post'

import { getApiErrorMessage } from '@/shared/api'
import { ROUTES } from '@/shared/routes'

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
		errorMessage: error
			? getApiErrorMessage(error, 'The post wasn’t deleted. Try again.')
			: null,
	}
}

export type TDeletePost = ReturnType<typeof useDeletePost>
