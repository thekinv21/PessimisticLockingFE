'use client'

import type { TPostListItem } from '../model/usePostList'
import { usePostVirtualList } from '../model/usePostVirtualList'
import { PostGroupHeader } from './PostGroupHeader'
import { PostListLoader } from './PostListLoader'
import { PostRow } from './PostRow'

type TPostListProps = {
	items: TPostListItem[]
	hasNextPage: boolean
	isFetchingNextPage: boolean
	isFetchNextPageError: boolean
	loadMore: () => unknown
}

export function PostList(props: TPostListProps) {
	const { items, isFetchNextPageError, loadMore } = props
	const { listRef, totalSize, virtualItems, scrollMargin, measureElement } =
		usePostVirtualList(props)

	return (
		<div ref={listRef} className='relative' style={{ height: totalSize }}>
			{virtualItems.map(virtualItem => {
				const item = items[virtualItem.index]

				return (
					<div
						key={virtualItem.key}
						ref={measureElement}
						data-index={virtualItem.index}
						className='absolute inset-x-0 top-0'
						style={{
							transform: `translateY(${virtualItem.start - scrollMargin}px)`,
						}}
					>
						{!item && (
							<PostListLoader
								isError={isFetchNextPageError}
								onRetry={loadMore}
							/>
						)}
						{item?.kind === 'header' && (
							<PostGroupHeader
								label={item.label}
								count={item.count}
								isFirst={item.isFirst}
							/>
						)}
						{item?.kind === 'row' && (
							<PostRow
								row={item.row}
								isFirst={item.isFirst}
								isLast={item.isLast}
							/>
						)}
					</div>
				)
			})}
		</div>
	)
}
