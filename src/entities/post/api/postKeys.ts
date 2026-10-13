import type { TApiQueryParams } from '@/shared/api'

export const postKeys = {
	all: ['posts'] as const,
	list: (params: TApiQueryParams) => [...postKeys.all, 'list', params] as const,
	detail: (id: number) => [...postKeys.all, 'detail', id] as const,
}
