import type { ButtonHTMLAttributes } from 'react'

import { LoaderCircle } from 'lucide-react'

import { cn } from '@/shared/lib'

const VARIANTS = {
	primary: 'bg-brand text-on-brand shadow-brand hover:bg-brand-strong',
	secondary:
		'border border-line bg-surface text-ink hover:border-line-strong hover:bg-raised',
	danger: 'bg-danger text-destructive-foreground hover:bg-danger-strong',
}

const SIZES = {
	md: 'h-12 px-5 text-[15px]',
	sm: 'h-10 px-4 text-sm',
}

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	pending?: boolean
	variant?: keyof typeof VARIANTS
	size?: keyof typeof SIZES
}

export function Button(props: TButtonProps) {
	const {
		pending = false,
		variant = 'primary',
		size = 'md',
		disabled,
		className,
		children,
		...rest
	} = props

	return (
		<button
			{...rest}
			disabled={pending || disabled}
			aria-busy={pending}
			className={cn(
				'inline-flex items-center justify-center gap-2 rounded-xl font-display font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 aria-busy:cursor-progress aria-busy:opacity-80',
				VARIANTS[variant],
				SIZES[size],
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
