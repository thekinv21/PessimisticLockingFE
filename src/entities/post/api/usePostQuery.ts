'use client'

import { useQuery } from '@tanstack/react-query'

import { instance, PRIVATE_ENDPOINTS, type TApiResponse } from '@/shared/api'

import type { TPost } from '../model/types'
import { postKeys } from './postKeys'

export function usePostQuery(id: number) {
	return useQuery({
		queryKey: postKeys.detail(id),
		queryFn: async () => {
			const { data } = await instance.get<TApiResponse<TPost>>(
				PRIVATE_ENDPOINTS.post_by_id(id),
			)

			return data.data
		},
	})
}
