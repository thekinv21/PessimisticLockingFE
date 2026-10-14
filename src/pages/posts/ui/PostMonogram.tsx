import { cn } from '@/shared/lib'

const TONES = [
	'bg-brand-soft text-brand-strong',
	'bg-highlight-soft text-highlight',
	'bg-info-soft text-info',
	'bg-success-soft text-success',
	'bg-warning-soft text-warning',
]

type TPostMonogramProps = { id: number; title: string; className?: string }

export function PostMonogram({ id, title, className }: TPostMonogramProps) {
	return (
		<span
			aria-hidden
			className={cn(
				'grid size-10 shrink-0 place-items-center rounded-xl font-display text-base font-extrabold',
				TONES[id % TONES.length],
				className,
			)}
		>
			{title.trim().charAt(0).toUpperCase() || '#'}
		</span>
	)
}
