import { cn } from '@/shared/lib'

type TAvatarProps = { initials: string; className?: string }

export function Avatar({ initials, className }: TAvatarProps) {
	return (
		<span
			aria-hidden
			className={cn(
				'inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-[13px] font-bold text-accent',
				className,
			)}
		>
			{initials}
		</span>
	)
}
