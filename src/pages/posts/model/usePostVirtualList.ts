'use client'

import { useEffect, useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

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

	const scrollRef = useRef<HTMLDivElement>(null)

	const virtualizer = useVirtualizer({
		count: hasNextPage ? items.length + 1 : items.length,
		getScrollElement: () => scrollRef.current,
		estimateSize: index => estimateSize(items[index]),
		getItemKey: index => items[index]?.key ?? 'loader',
		overscan: 6,
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
		scrollRef,
		totalSize: virtualizer.getTotalSize(),
		virtualItems,
		measureElement: virtualizer.measureElement,
	}
}
