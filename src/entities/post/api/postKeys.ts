import type { TApiQueryParams } from '@/shared/api'

export type TPostListParams = Omit<TApiQueryParams, 'offset'>

export const postKeys = {
	all: ['posts'] as const,
	lists: () => [...postKeys.all, 'list'] as const,
	list: (params: TPostListParams) => [...postKeys.lists(), params] as const,
	detail: (id: number) => [...postKeys.all, 'detail', id] as const,
}
