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
	const { scrollRef, totalSize, virtualItems, measureElement } =
		usePostVirtualList(props)

	return (
		<div ref={scrollRef} className='min-h-0 grow overflow-y-auto'>
			<div className='mx-auto w-full max-w-4xl px-6 pb-16 max-mobile:px-4'>
				<div className='relative' style={{ height: totalSize }}>
					{virtualItems.map(virtualItem => {
						const item = items[virtualItem.index]

						return (
							<div
								key={virtualItem.key}
								ref={measureElement}
								data-index={virtualItem.index}
								className='absolute inset-x-0 top-0'
								style={{
									transform: `translateY(${virtualItem.start}px)`,
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
			</div>
		</div>
	)
}
