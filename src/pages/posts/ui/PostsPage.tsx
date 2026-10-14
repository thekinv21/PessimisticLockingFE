'use client'

import { FileText } from 'lucide-react'

import { Button } from '@/shared/ui'

import { usePostGroups } from '../model/usePostGroups'
import { PostGroup } from './PostGroup'
import { PostListSkeleton } from './PostListSkeleton'

export function PostsPage() {
	const { groups, total, isPending, isError, isEmpty, retry } = usePostGroups()

	return (
		<main className='mx-auto w-full max-w-4xl animate-rise px-6 pt-10 pb-16 max-mobile:px-4 max-mobile:pt-6'>
			<header className='flex items-center gap-3'>
				<h1 className='font-display text-[32px] leading-10 font-extrabold tracking-tight text-ink'>
					Posts
				</h1>
				{!isPending && !isError && (
					<span className='rounded-full bg-brand-soft px-2.5 py-0.5 font-display text-sm font-bold text-brand-strong'>
						{total}
					</span>
				)}
			</header>
			<div className='mt-8 flex flex-col gap-8'>
				{isPending && <PostListSkeleton />}
				{isError && (
					<div
						role='alert'
						className='flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-6'
					>
						<p className='text-ink'>
							Posts didn’t load. Check your connection and try again.
						</p>
						<Button variant='secondary' size='sm' onClick={retry}>
							Try again
						</Button>
					</div>
				)}
				{isEmpty && (
					<div className='flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center'>
						<span className='grid size-12 place-items-center rounded-xl bg-raised text-ink-subtle'>
							<FileText className='size-5' aria-hidden />
						</span>
						<p className='text-ink-muted'>There are no posts yet.</p>
					</div>
				)}
				{groups.map(group => (
					<PostGroup key={group.label} group={group} />
				))}
			</div>
		</main>
	)
}
