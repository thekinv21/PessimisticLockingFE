'use client'

import Link from 'next/link'

import { ArrowLeft, Trash2 } from 'lucide-react'

import { ROUTES } from '@/shared/routes'
import { Button } from '@/shared/ui'

import { useDeletePost } from '../model/useDeletePost'
import { usePostDetail } from '../model/usePostDetail'
import { DeletePostDialog } from './DeletePostDialog'
import { PostByline } from './PostByline'
import { PostDetailSkeleton } from './PostDetailSkeleton'

type TPostDetailPageProps = { id: number }

export function PostDetailPage({ id }: TPostDetailPageProps) {
	const detail = usePostDetail(id)

	const deletion = useDeletePost(id)

	const { post } = detail

	return (
		<main className='mx-auto w-full max-w-4xl animate-rise px-6 pt-8 pb-16 max-mobile:px-4 max-mobile:pt-6'>
			<Link
				href={ROUTES.home}
				className='inline-flex items-center gap-1.5 rounded font-semibold text-ink-muted hover:text-ink'
			>
				<ArrowLeft className='size-4' aria-hidden />
				All posts
			</Link>
			{detail.isPending && <PostDetailSkeleton />}
			{detail.isError && (
				<div role='alert' className='mt-8 flex flex-col items-start gap-4'>
					<p className='text-ink'>
						This post didn’t load. Check your connection and try again.
					</p>
					<Button variant='secondary' size='sm' onClick={detail.retry}>
						Try again
					</Button>
				</div>
			)}
			{detail.isMissing && (
				<p className='mt-8 text-ink-muted'>
					This post doesn’t exist or was deleted.
				</p>
			)}
			{post && (
				<>
					<header className='mt-6 flex items-start justify-between gap-4 border-b border-line pb-6 max-mobile:flex-col'>
						<div className='min-w-0'>
							<h1 className='font-display text-[32px] leading-10 font-extrabold tracking-tight text-balance break-words text-ink'>
								{post.title}
							</h1>
							<p className='mt-2 text-ink-subtle'>{detail.editedText}</p>
						</div>
						<Button
							variant='secondary'
							size='sm'
							onClick={deletion.open}
							className='shrink-0'
						>
							<Trash2 className='size-4' aria-hidden />
							Delete
						</Button>
					</header>
					<div className='mt-8'>
						{post.description ? (
							<p className='max-w-prose text-[17px] leading-7 whitespace-pre-line text-ink'>
								{post.description}
							</p>
						) : (
							<p className='text-ink-subtle italic'>No description.</p>
						)}
						{detail.byline && <PostByline byline={detail.byline} />}
					</div>
					<DeletePostDialog postTitle={post.title} deletion={deletion} />
				</>
			)}
		</main>
	)
}
