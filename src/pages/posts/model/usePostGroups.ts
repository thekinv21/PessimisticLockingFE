'use client'

import { usePostListQuery } from '@/entities/post'

import { formatRelativeTime } from '@/shared/lib'
import { ROUTES } from '@/shared/routes'

import { groupByDay } from '../lib/groupByDay'

const TONES = ['brand', 'highlight', 'info', 'success', 'warning'] as const

export type TPostTone = (typeof TONES)[number]

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

export function usePostGroups() {
	const { data, isPending, isError, refetch } = usePostListQuery({
		offset: 0,
		limit: 10,
	})

	const rows =
		data?.data.map(post => ({
			id: post.id,
			href: ROUTES.post(post.id),
			title: post.title,
			initial: post.title.trim().charAt(0).toUpperCase() || '#',
			tone: TONES[post.id % TONES.length],
			description: post.description,
			updatedAt: post.updatedAt,
			editedAt: formatEditedAt(post.updatedAt),
			editedAgo: `Edited ${formatRelativeTime(post.updatedAt)}`,
		})) ?? []

	const groups = groupByDay(
		rows.toSorted((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)),
		row => row.updatedAt,
	)

	return {
		groups,
		total: data?.meta.total ?? 0,
		isPending,
		isError,
		isEmpty: !isPending && !isError && rows.length === 0,
		retry: () => refetch(),
	}
}

export type TPostGroup = ReturnType<typeof usePostGroups>['groups'][number]

export type TPostRow = TPostGroup['items'][number]
