import type { ReactNode } from 'react'

import { cn } from '@/shared/lib'

type TOverlineProps = { children: ReactNode; className?: string }

export function Overline({ children, className }: TOverlineProps) {
	return (
		<span
			className={cn(
				'block text-[11px] leading-4 font-semibold tracking-[0.08em] text-ink-subtle uppercase',
				className,
			)}
		>
			{children}
		</span>
	)
}
