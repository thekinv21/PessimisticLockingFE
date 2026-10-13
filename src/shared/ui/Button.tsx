import type { ButtonHTMLAttributes } from 'react'

import { LoaderCircle } from 'lucide-react'

import { cn } from '@/shared/lib'

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	pending?: boolean
}

export function Button(props: TButtonProps) {
	const { pending = false, disabled, className, children, ...rest } = props

	return (
		<button
			{...rest}
			disabled={pending || disabled}
			aria-busy={pending}
			className={cn(
				'inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-5 font-display text-[15px] font-bold text-on-brand shadow-brand transition-colors hover:bg-brand-strong active:translate-y-px disabled:cursor-progress disabled:opacity-80',
				className,
			)}
		>
			{pending && (
				<LoaderCircle className='size-4.5 animate-spin' aria-hidden />
			)}
			{children}
		</button>
	)
}
