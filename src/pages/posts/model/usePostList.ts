'use client'

import { useState } from 'react'

import { type TPost, usePostListInfiniteQuery } from '@/entities/post'

import { formatRelativeTime } from '@/shared/lib'
import { ROUTES } from '@/shared/routes'

import { groupByDay } from '../lib/groupByDay'

export const ROW_HEIGHT = 73

const FALLBACK_PAGE_SIZE = 10

const getViewportPageSize = () =>
	typeof window === 'undefined'
		? FALLBACK_PAGE_SIZE
		: Math.ceil(window.innerHeight / ROW_HEIGHT)

const timeFormatter = new Intl.DateTimeFormat('en', { timeStyle: 'short' })

const dateFormatter = new Intl.DateTimeFormat('en', {
	month: 'short',
	day: 'numeric',
})

const isToday = (date: Date) =>
	date.toDateString() === new Date().toDateString()

const formatEditedAt = (value: string) => {
	const date = new Date(value)
	return isToday(date) ? timeFormatter.format(date) : dateFormatter.format(date)
}

const uniqueById = (posts: TPost[]) => [
	...new Map(posts.map(post => [post.id, post])).values(),
]

const toRow = (post: TPost) => ({
	id: post.id,
	href: ROUTES.post(post.id),
	title: post.title,
	description: post.description,
	updatedAt: post.updatedAt,
	editedAt: formatEditedAt(post.updatedAt),
	editedAgo: `Edited ${formatRelativeTime(post.updatedAt)}`,
})

export type TPostRow = ReturnType<typeof toRow>

export type TPostListItem =
	| {
			kind: 'header'
			key: string
			label: string
			count: number
			isFirst: boolean
	  }
	| {
			kind: 'row'
			key: number
			row: TPostRow
			isFirst: boolean
			isLast: boolean
	  }

export function usePostList() {
	const [pageSize] = useState(getViewportPageSize)

	const {
		data,
		isPending,
		isError,
		refetch,
		hasNextPage,
		isFetchingNextPage,
		isFetchNextPageError,
		fetchNextPage,
	} = usePostListInfiniteQuery({ limit: pageSize })

	const rows = uniqueById(data?.pages.flatMap(page => page.data) ?? [])
		.map(toRow)
		.toSorted((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))

	const items = groupByDay(rows, row => row.updatedAt).flatMap<TPostListItem>(
		(group, groupIndex) => [
			{
				kind: 'header',
				key: group.label,
				label: group.label,
				count: group.items.length,
				isFirst: groupIndex === 0,
			},
			...group.items.map((row, index) => ({
				kind: 'row' as const,
				key: row.id,
				row,
				isFirst: index === 0,
				isLast: index === group.items.length - 1,
			})),
		],
	)

	return {
		items,
		total: data?.pages.at(-1)?.meta.total ?? 0,
		isPending,
		isError,
		isEmpty: !isPending && !isError && rows.length === 0,
		retry: () => refetch(),
		hasNextPage,
		isFetchingNextPage,
		isFetchNextPageError,
		loadMore: fetchNextPage,
	}
}
