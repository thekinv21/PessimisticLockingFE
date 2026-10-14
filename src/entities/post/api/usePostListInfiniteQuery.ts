'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import {
	instance,
	PRIVATE_ENDPOINTS,
	type TApiPaginatedResponse,
} from '@/shared/api'

import type { TPost } from '../model/types'
import { postKeys, type TPostListParams } from './postKeys'

export function usePostListInfiniteQuery(params: TPostListParams) {
	return useInfiniteQuery({
		queryKey: postKeys.list(params),
		queryFn: async ({ pageParam }) => {
			const { data } = await instance.get<TApiPaginatedResponse<TPost>>(
				PRIVATE_ENDPOINTS.list_of_posts,
				{ params: { ...params, offset: pageParam } },
			)

			return data
		},
		initialPageParam: 0,
		getNextPageParam: ({ meta }) =>
			meta.hasNext ? meta.offset + meta.limit : undefined,
	})
}
