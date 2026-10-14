import { Button } from './Button'

type TErrorStateProps = { message: string; onRetry: () => void }

export function ErrorState({ message, onRetry }: TErrorStateProps) {
	return (
		<div
			role='alert'
			className='flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-6'
		>
			<p className='text-ink'>{message}</p>
			<Button variant='secondary' size='sm' onClick={onRetry}>
				Try again
			</Button>
		</div>
	)
}
