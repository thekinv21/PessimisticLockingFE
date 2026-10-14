'use client'

import { ErrorState } from '@/shared/ui'

import { usePostDetailPage } from '../model/usePostDetailPage'
import { BackLink } from './BackLink'
import { PostDetailContent } from './PostDetailContent'
import { PostDetailSkeleton } from './PostDetailSkeleton'

type TPostDetailPageProps = { id: number }

export function PostDetailPage({ id }: TPostDetailPageProps) {
	const page = usePostDetailPage(id)

	const { detail, lock } = page

	return (
		<main className='mx-auto w-full max-w-4xl animate-rise px-6 pt-8 pb-16 max-mobile:px-4 max-mobile:pt-6'>
			<BackLink />
			{detail.isPending && <PostDetailSkeleton />}
			{detail.isError && (
				<div className='mt-8'>
					<ErrorState
						message='This post didn’t load. Check your connection and try again.'
						onRetry={detail.retry}
					/>
				</div>
			)}
			{(detail.isMissing || lock.deletedBy) && (
				<p className='mt-8 rounded-2xl border border-dashed border-line-strong px-6 py-12 text-center text-ink-muted'>
					{lock.deletedBy
						? `${lock.deletedBy} deleted this post.`
						: 'This post doesn’t exist or was deleted.'}
				</p>
			)}
			{detail.post && !lock.deletedBy && (
				<PostDetailContent post={detail.post} page={page} />
			)}
		</main>
	)
}
