'use client'

import { usePostQuery } from '@/entities/post'

import { formatRelativeTime } from '@/shared/lib'

const dateFormatter = new Intl.DateTimeFormat('en', {
	dateStyle: 'medium',
	timeStyle: 'short',
})

const formatDate = (value: string) => dateFormatter.format(new Date(value))

const shortenId = (value: string) =>
	value.length > 14 ? `${value.slice(0, 8)}…${value.slice(-4)}` : value

const toInitials = (name: string) =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map(word => word.charAt(0).toUpperCase())
		.join('')

export function usePostDetail(id: number) {
	const { data: post, isPending, isError, refetch } = usePostQuery(id)

	const isEdited = !!post && post.updatedAt !== post.createdAt

	const editor = post?.updatedBy ? ` by ${post.updatedBy}` : ''

	const byline = post && {
		name: post.createdBy ?? 'Unknown author',
		initials: post.createdBy ? toInitials(post.createdBy) : '?',
		publishedText: `Published ${formatDate(post.createdAt)}`,
		editedText: isEdited
			? `Edited ${formatDate(post.updatedAt)}${editor}`
			: 'Not edited yet',
		postNumber: `Post #${post.id}`,
		authorId: post.authorId,
		authorShortId: post.authorId ? shortenId(post.authorId) : null,
	}

	return {
		post,
		byline,
		editedText: post
			? `${isEdited ? 'Edited' : 'Published'} ${formatRelativeTime(post.updatedAt)}`
			: '',
		isPending,
		isError,
		isMissing: !isPending && !isError && !post,
		retry: () => refetch(),
	}
}

export type TPostByline = NonNullable<
	ReturnType<typeof usePostDetail>['byline']
>
