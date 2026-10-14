export function PostDetailSkeleton() {
	return (
		<div
			aria-hidden
			className='mt-6 flex flex-col gap-4 motion-safe:animate-pulse'
		>
			<span className='h-9 w-3/5 rounded-lg bg-sunken' />
			<span className='h-4 w-32 rounded bg-sunken' />
			<span className='mt-6 h-4 w-full max-w-prose rounded bg-sunken' />
			<span className='h-4 w-11/12 max-w-prose rounded bg-sunken' />
			<span className='h-4 w-2/3 max-w-prose rounded bg-sunken' />
		</div>
	)
}
