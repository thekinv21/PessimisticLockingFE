'use client'

import { ErrorState } from '@/shared/ui'

import { usePostList } from '../model/usePostList'
import { PostList } from './PostList'
import { PostListEmpty } from './PostListEmpty'
import { PostListSkeleton } from './PostListSkeleton'
import { PostsHeader } from './PostsHeader'

export function PostsPage() {
	const { items, total, isPending, isError, isEmpty, retry, ...pagination } =
		usePostList()

	return (
		<main className='flex min-h-0 grow animate-rise flex-col'>
			<div className='mx-auto w-full max-w-4xl shrink-0 px-6 pt-10 pb-8 max-mobile:px-4 max-mobile:pt-6'>
				<PostsHeader total={isPending || isError ? null : total} />
			</div>
			{items.length > 0 ? (
				<PostList items={items} {...pagination} />
			) : (
				<div className='mx-auto w-full max-w-4xl px-6 max-mobile:px-4'>
					{isPending && <PostListSkeleton />}
					{isError && (
						<ErrorState
							message='Posts didn’t load. Check your connection and try again.'
							onRetry={retry}
						/>
					)}
					{isEmpty && <PostListEmpty />}
				</div>
			)}
		</main>
	)
}
