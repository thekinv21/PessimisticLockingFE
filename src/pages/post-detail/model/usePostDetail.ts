'use client'

import { usePostQuery } from '@/entities/post'

import { formatRelativeTime } from '@/shared/lib'

const dateFormatter = new Intl.DateTimeFormat('en', {
	dateStyle: 'medium',
	timeStyle: 'short',
})

const formatDate = (value: string) => dateFormatter.format(new Date(value))

export function usePostDetail(id: number) {
	const { data: post, isPending, isError, refetch } = usePostQuery(id)

	const fields = post
		? [
				{ label: 'Post ID', value: `#${post.id}`, mono: true },
				{ label: 'Author', value: post.authorId ?? '—', mono: true },
				{ label: 'Created by', value: post.createdBy ?? '—', mono: true },
				{ label: 'Updated by', value: post.updatedBy ?? '—', mono: true },
				{ label: 'Created', value: formatDate(post.createdAt), mono: false },
				{ label: 'Updated', value: formatDate(post.updatedAt), mono: false },
			]
		: []

	const editedText = post ? `Edited ${formatRelativeTime(post.updatedAt)}` : ''

	return {
		post,
		fields,
		editedText,
		isPending,
		isError,
		retry: () => refetch(),
	}
}

export type TPostField = ReturnType<typeof usePostDetail>['fields'][number]
