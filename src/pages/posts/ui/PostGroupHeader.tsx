import { cn } from '@/shared/lib'

type TPostGroupHeaderProps = { label: string; count: number; isFirst: boolean }

export function PostGroupHeader({
	label,
	count,
	isFirst,
}: TPostGroupHeaderProps) {
	return (
		<h2
			className={cn(
				'flex items-center gap-2 px-1 pb-2 font-display text-sm font-bold text-ink-muted',
				!isFirst && 'pt-8',
			)}
		>
			{label}
			<span className='text-ink-subtle'>{count}</span>
		</h2>
	)
}
