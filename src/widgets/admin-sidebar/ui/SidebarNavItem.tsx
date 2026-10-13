import Link from 'next/link'

import { cn } from '@/shared/lib'

import type { TSidebarItem } from '../model/useSidebarNav'

type TSidebarNavItemProps = { item: TSidebarItem }

export function SidebarNavItem({ item }: TSidebarNavItemProps) {
	const Icon = item.icon

	return (
		<Link
			href={item.href}
			title={item.label}
			aria-current={item.active ? 'page' : undefined}
			className={cn(
				'flex min-h-10 shrink-0 items-center gap-2.5 rounded-xl px-2.5 no-underline transition-colors duration-150 max-laptop:min-w-10 max-laptop:justify-center max-laptop:px-0',
				item.active
					? 'bg-brand-soft font-semibold text-brand-strong'
					: 'font-medium text-ink-muted hover:bg-raised hover:text-ink',
			)}
		>
			<Icon size={19} aria-hidden />
			<span className='grow truncate max-laptop:sr-only'>{item.label}</span>
		</Link>
	)
}
