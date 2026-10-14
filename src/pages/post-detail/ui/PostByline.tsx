import type { TPostByline } from '../model/usePostDetail'

type TPostBylineProps = { byline: TPostByline }

export function PostByline({ byline }: TPostBylineProps) {
	return (
		<footer className='mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-line pt-6'>
			<div className='flex items-center gap-3.5'>
				<span
					aria-hidden
					className='grid size-12 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-base font-extrabold text-brand-strong'
				>
					{byline.initials}
				</span>
				<div className='flex flex-col'>
					<span className='font-display text-base font-bold text-ink'>
						{byline.name}
					</span>
					<span className='text-[14px] text-ink-muted'>
						{byline.publishedText}
					</span>
					<span className='text-[13px] text-ink-subtle'>
						{byline.editedText}
					</span>
				</div>
			</div>
			<dl className='flex flex-col items-end gap-1 text-[13px] text-ink-subtle max-mobile:items-start'>
				<div>
					<dt className='sr-only'>Post number</dt>
					<dd className='font-mono'>{byline.postNumber}</dd>
				</div>
				{byline.authorShortId && (
					<div className='flex gap-1.5'>
						<dt>Author ID</dt>
						<dd title={byline.authorId ?? undefined} className='font-mono'>
							{byline.authorShortId}
						</dd>
					</div>
				)}
			</dl>
		</footer>
	)
}
