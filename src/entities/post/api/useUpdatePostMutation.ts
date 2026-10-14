'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { instance, LOCK_TOKEN_HEADER, PRIVATE_ENDPOINTS } from '@/shared/api'

import { postKeys } from './postKeys'

export type TUpdatePostValues = {
	title: string
	description: string | null
}

type TUpdatePostInput = {
	id: number
	values: TUpdatePostValues
	lockToken: string
}

export function useUpdatePostMutation() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, values, lockToken }: TUpdatePostInput) =>
			instance.put(PRIVATE_ENDPOINTS.post_by_id(id), values, {
				headers: { [LOCK_TOKEN_HEADER]: lockToken },
			}),
		onSuccess: (_, { id }) =>
			Promise.all([
				queryClient.invalidateQueries({ queryKey: postKeys.detail(id) }),
				queryClient.invalidateQueries({ queryKey: postKeys.lists() }),
			]),
	})
}
