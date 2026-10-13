'use client'

import { useQuery } from '@tanstack/react-query'

import {
	instance,
	PRIVATE_ENDPOINTS,
	type TApiPaginatedResponse,
	type TApiQueryParams,
} from '@/shared/api'

import type { TPost } from '../model/types'

import { postKeys } from './postKeys'

export function usePostListQuery(params: TApiQueryParams) {
	return useQuery({
		queryKey: postKeys.list(params),
		queryFn: async () => {
			const { data } = await instance.get<TApiPaginatedResponse<TPost>>(
				PRIVATE_ENDPOINTS.list_of_posts,
				{ params },
			)

			return data
		},
		refetchInterval: 3000,
	})
}
