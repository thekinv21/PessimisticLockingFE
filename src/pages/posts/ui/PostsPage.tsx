'use client'

import { ErrorState } from '@/shared/ui'

import { usePostGroups } from '../model/usePostGroups'
import { PostGroup } from './PostGroup'
import { PostListEmpty } from './PostListEmpty'
import { PostListSkeleton } from './PostListSkeleton'
import { PostsHeader } from './PostsHeader'

export function PostsPage() {
	const { groups, total, isPending, isError, isEmpty, retry } = usePostGroups()

	return (
		<main className='mx-auto w-full max-w-4xl animate-rise px-6 pt-10 pb-16 max-mobile:px-4 max-mobile:pt-6'>
			<PostsHeader total={isPending || isError ? null : total} />
			<div className='mt-8 flex flex-col gap-8'>
				{isPending && <PostListSkeleton />}
				{isError && (
					<ErrorState
						message='Posts didn’t load. Check your connection and try again.'
						onRetry={retry}
					/>
				)}
				{isEmpty && <PostListEmpty />}
				{groups.map(group => (
					<PostGroup key={group.label} group={group} />
				))}
			</div>
		</main>
	)
}
