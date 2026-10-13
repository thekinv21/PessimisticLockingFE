import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/shared/lib'

type TIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function IconButton({ className, ...rest }: TIconButtonProps) {
	return (
		<button
			type='button'
			{...rest}
			className={cn(
				'relative grid size-11 shrink-0 place-items-center rounded-xl bg-surface text-ink-muted shadow-clay-sm transition-colors hover:text-ink active:translate-y-px active:shadow-press',
				className,
			)}
		/>
	)
}
