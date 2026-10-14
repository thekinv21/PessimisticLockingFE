'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { instance, PRIVATE_ENDPOINTS } from '@/shared/api'

import { postKeys } from './postKeys'

export function useDeletePostMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: number) =>
			instance.delete(PRIVATE_ENDPOINTS.post_by_id(id)),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: postKeys.lists() }),
	})
}
