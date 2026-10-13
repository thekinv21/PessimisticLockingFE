import type { InputHTMLAttributes } from 'react'

import { cn } from '@/shared/lib'

type TCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
	label: string
}

export function Checkbox({ label, className, ...rest }: TCheckboxProps) {
	return (
		<label
			className={cn(
				'inline-flex cursor-pointer items-center gap-2.5 text-ink-muted select-none',
				className,
			)}
		>
			<input
				{...rest}
				type='checkbox'
				className='size-4.5 cursor-pointer rounded accent-brand'
			/>
			{label}
		</label>
	)
}
