import { type InputHTMLAttributes, type ReactNode, useId } from 'react'

import { cn } from '@/shared/lib'

type TTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string
	error?: string
	leading?: ReactNode
	trailing?: ReactNode
}

export function TextField(props: TTextFieldProps) {
	const { label, error, leading, trailing, className, ...rest } = props
	const id = useId()
	const errorId = `${id}-error`

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			<label htmlFor={id} className='font-medium text-ink'>
				{label}
			</label>
			<div className='relative'>
				{leading && (
					<div className='pointer-events-none absolute inset-y-0 left-4 flex items-center text-ink-subtle'>
						{leading}
					</div>
				)}
				<input
					{...rest}
					id={id}
					aria-invalid={Boolean(error)}
					aria-describedby={error ? errorId : undefined}
					className={cn(
						'h-12 w-full rounded-xl border border-line bg-raised px-4 text-[15px] text-ink shadow-press transition-colors outline-none focus:border-brand focus:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-invalid:border-danger',
						leading ? 'pl-11' : undefined,
						trailing ? 'pr-12' : undefined,
					)}
				/>
				{trailing && (
					<div className='absolute inset-y-0 right-1.5 flex items-center'>
						{trailing}
					</div>
				)}
			</div>
			{error && (
				<p id={errorId} className='text-[13px] leading-5 text-danger'>
					{error}
				</p>
			)}
		</div>
	)
}
