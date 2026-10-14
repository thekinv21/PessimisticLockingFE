const ROWS = [0, 1, 2, 3, 4]

export function PostListSkeleton() {
	return (
		<div aria-hidden className='flex flex-col gap-2'>
			<span className='mx-1 h-4 w-16 rounded bg-sunken motion-safe:animate-pulse' />
			<ul className='divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface'>
				{ROWS.map(row => (
					<li
						key={row}
						className='flex items-center gap-4 px-5 py-4 motion-safe:animate-pulse'
					>
						<span className='size-10 shrink-0 rounded-xl bg-sunken' />
						<div className='flex grow flex-col gap-2'>
							<span className='h-4 w-2/5 rounded bg-sunken' />
							<span className='h-3 w-3/5 rounded bg-sunken' />
						</div>
						<span className='h-3 w-12 rounded bg-sunken' />
					</li>
				))}
			</ul>
		</div>
	)
}
