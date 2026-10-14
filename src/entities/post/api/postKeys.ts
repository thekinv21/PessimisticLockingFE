import type { TApiQueryParams } from '@/shared/api'

export const postKeys = {
	all: ['posts'] as const,
	lists: () => [...postKeys.all, 'list'] as const,
	list: (params: TApiQueryParams) => [...postKeys.lists(), params] as const,
	detail: (id: number) => [...postKeys.all, 'detail', id] as const,
}
