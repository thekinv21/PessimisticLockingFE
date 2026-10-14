type TPostsHeaderProps = { total: number | null }

export function PostsHeader({ total }: TPostsHeaderProps) {
	return (
		<header className='flex items-center gap-3'>
			<h1 className='font-display text-[32px] leading-10 font-extrabold tracking-tight text-ink'>
				Posts
			</h1>
			{total !== null && (
				<span className='rounded-full bg-brand-soft px-2.5 py-0.5 font-display text-sm font-bold text-brand-strong'>
					{total}
				</span>
			)}
		</header>
	)
}
