'use client'

import { useEffect, useState } from 'react'

import { useWindowVirtualizer } from '@tanstack/react-virtual'

import { ROW_HEIGHT, type TPostListItem } from './usePostList'

const estimateSize = (item: TPostListItem | undefined) => {
	if (!item) return 72
	if (item.kind === 'row') return ROW_HEIGHT
	return item.isFirst ? 28 : 60
}

type TUsePostVirtualListParams = {
	items: TPostListItem[]
	hasNextPage: boolean
	isFetchingNextPage: boolean
	isFetchNextPageError: boolean
	loadMore: () => unknown
}

export function usePostVirtualList(params: TUsePostVirtualListParams) {
	const {
		items,
		hasNextPage,
		isFetchingNextPage,
		isFetchNextPageError,
		loadMore,
	} = params

	const [listElement, setListElement] = useState<HTMLDivElement | null>(null)
	const scrollMargin = listElement?.offsetTop ?? 0

	const virtualizer = useWindowVirtualizer({
		count: hasNextPage ? items.length + 1 : items.length,
		estimateSize: index => estimateSize(items[index]),
		getItemKey: index => items[index]?.key ?? 'loader',
		overscan: 6,
		scrollMargin,
	})

	const virtualItems = virtualizer.getVirtualItems()
	const lastVisibleIndex = virtualizer.range?.endIndex ?? -1

	useEffect(() => {
		const isEndVisible = lastVisibleIndex >= items.length - 1
		const canLoad = hasNextPage && !isFetchingNextPage && !isFetchNextPageError

		if (isEndVisible && canLoad) loadMore()
	}, [
		lastVisibleIndex,
		items.length,
		hasNextPage,
		isFetchingNextPage,
		isFetchNextPageError,
		loadMore,
	])

	return {
		listRef: setListElement,
		totalSize: virtualizer.getTotalSize(),
		virtualItems,
		scrollMargin,
		measureElement: virtualizer.measureElement,
	}
}
