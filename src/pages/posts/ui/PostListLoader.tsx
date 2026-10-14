import { LoaderCircle } from 'lucide-react'

import { Button } from '@/shared/ui'

type TPostListLoaderProps = { isError: boolean; onRetry: () => void }

export function PostListLoader({ isError, onRetry }: TPostListLoaderProps) {
	if (isError) {
		return (
			<div role='alert' className='flex items-center justify-center gap-3 py-6'>
				<p className='text-[14px] text-ink-muted'>Couldn’t load more posts.</p>
				<Button variant='secondary' size='sm' onClick={onRetry}>
					Try again
				</Button>
			</div>
		)
	}

	return (
		<div className='flex justify-center py-6' aria-live='polite'>
			<LoaderCircle
				className='size-5 animate-spin text-ink-subtle'
				aria-hidden
			/>
			<span className='sr-only'>Loading more posts</span>
		</div>
	)
}
