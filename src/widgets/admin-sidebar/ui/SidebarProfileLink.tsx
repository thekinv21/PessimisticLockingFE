import Link from 'next/link'

import { ChevronRight } from 'lucide-react'

import { ROUTES } from '@/shared/routes'
import { Avatar } from '@/shared/ui'

type TSidebarProfileLinkProps = {
	initials: string
	fullName: string
	role: string
	active: boolean
}

export function SidebarProfileLink(props: TSidebarProfileLinkProps) {
	const { initials, fullName, role, active } = props

	return (
		<Link
			href={ROUTES.profile}
			title='My profile'
			aria-current={active ? 'page' : undefined}
			className='flex items-center gap-2.5 rounded-2xl border border-line p-2 text-ink no-underline transition-colors duration-150 hover:bg-raised aria-[current=page]:bg-brand-soft max-laptop:justify-center max-laptop:border-0 max-laptop:p-1 max-mobile:hidden'
		>
			<Avatar initials={initials} />
			<span className='min-w-0 grow max-laptop:hidden'>
				<span className='block truncate font-semibold'>{fullName}</span>
				<span className='block truncate text-[12.5px] leading-4.5 text-ink-muted'>
					{role}
				</span>
			</span>
			<ChevronRight
				size={16}
				aria-hidden
				className='text-ink-subtle max-laptop:hidden'
			/>
		</Link>
	)
}
