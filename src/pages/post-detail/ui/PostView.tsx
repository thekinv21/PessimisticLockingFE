import type { ReactNode } from 'react'

import type { TPost } from '@/entities/post'

type TPostViewProps = { post: TPost; editedText: string; actions: ReactNode }

export function PostView({ post, editedText, actions }: TPostViewProps) {
	return (
		<article>
			<header className='mt-6 flex items-start justify-between gap-4 border-b border-line pb-6 max-mobile:flex-col'>
				<div className='min-w-0'>
					<h1 className='font-display text-[32px] leading-10 font-extrabold tracking-tight text-balance break-words text-ink'>
						{post.title}
					</h1>
					<p className='mt-2 text-ink-subtle'>{editedText}</p>
				</div>
				{actions}
			</header>
			{post.description ? (
				<p className='mt-8 max-w-prose text-[17px] leading-7 whitespace-pre-line text-ink'>
					{post.description}
				</p>
			) : (
				<p className='mt-8 text-ink-subtle italic'>No description.</p>
			)}
		</article>
	)
}
