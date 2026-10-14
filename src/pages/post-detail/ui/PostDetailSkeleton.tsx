export function PostDetailSkeleton() {
	return (
		<div aria-hidden className='mt-6 motion-safe:animate-pulse'>
			<div className='flex flex-col gap-3 border-b border-line pb-6'>
				<span className='h-9 w-3/5 rounded-lg bg-sunken' />
				<span className='h-4 w-36 rounded bg-sunken' />
			</div>
			<div className='mt-8 flex max-w-prose flex-col gap-3'>
				<span className='h-4 w-full rounded bg-sunken' />
				<span className='h-4 w-11/12 rounded bg-sunken' />
				<span className='h-4 w-2/3 rounded bg-sunken' />
			</div>
			<div className='mt-10 flex items-center gap-3.5 border-t border-line pt-6'>
				<span className='size-12 rounded-full bg-sunken' />
				<div className='flex flex-col gap-2'>
					<span className='h-4 w-28 rounded bg-sunken' />
					<span className='h-3 w-44 rounded bg-sunken' />
				</div>
			</div>
		</div>
	)
}
