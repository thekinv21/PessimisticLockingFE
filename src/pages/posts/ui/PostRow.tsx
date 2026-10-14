import Link from 'next/link'

import { ChevronRight } from 'lucide-react'

import { cn } from '@/shared/lib'

import type { TPostRow, TPostTone } from '../model/usePostGroups'

const TONE_CLASSES: Record<TPostTone, string> = {
	brand: 'bg-brand-soft text-brand-strong',
	highlight: 'bg-highlight-soft text-highlight',
	info: 'bg-info-soft text-info',
	success: 'bg-success-soft text-success',
	warning: 'bg-warning-soft text-warning',
}

type TPostRowProps = { row: TPostRow }

export function PostRow({ row }: TPostRowProps) {
	return (
		<li>
			<Link
				href={row.href}
				title={row.editedAgo}
				className='group relative flex items-center gap-4 px-5 py-4 transition-colors max-mobile:gap-3 hover:bg-raised focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus max-mobile:px-4'
			>
				<span
					aria-hidden
					className='absolute inset-y-3 left-0 w-0.75 rounded-r-full bg-brand opacity-0 transition-opacity group-hover:opacity-100'
				/>
				<span
					aria-hidden
					className={cn(
						'grid size-10 shrink-0 place-items-center rounded-xl font-display text-base font-extrabold',
						TONE_CLASSES[row.tone],
					)}
				>
					{row.initial}
				</span>
				<div className='min-w-0 grow'>
					<p className='truncate font-display text-base leading-6 font-bold text-ink max-mobile:line-clamp-2 max-mobile:whitespace-normal'>
						{row.title}
					</p>
					<p className='truncate text-[14px] leading-5 text-ink-muted'>
						{row.description ?? (
							<span className='text-ink-subtle italic'>No description</span>
						)}
					</p>
				</div>
				<span className='w-12 shrink-0 text-right font-mono text-[12px] text-ink-subtle max-mobile:hidden'>
					#{row.id}
				</span>
				<span className='w-20 shrink-0 text-right max-mobile:w-auto text-[13px] text-ink-muted tabular-nums'>
					{row.editedAt}
				</span>
				<ChevronRight
					className='size-4 shrink-0 text-ink-subtle max-mobile:hidden transition-transform group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transition-none'
					aria-hidden
				/>
			</Link>
		</li>
	)
}
