'use client'

import type { ReactNode } from 'react'

import { SearchInput } from '@/shared/ui'

import { useSearchShortcut } from '../model/useSearchShortcut'
import { NotificationsButton } from './NotificationsButton'

type TPageHeaderProps = {
	title: string
	actions?: ReactNode
	search?: boolean
}

export function PageHeader({
	title,
	actions,
	search = true,
}: TPageHeaderProps) {
	const { inputRef, shortcutLabel } = useSearchShortcut()

	return (
		<header className='flex shrink-0 animate-fade items-center gap-3 px-6 pt-6 pb-4 max-mobile:flex-wrap max-mobile:px-4 max-mobile:pt-4'>
			<h1 className='min-w-0 flex-auto truncate font-display text-[26px] leading-8 font-extrabold tracking-tight text-ink'>
				{title}
			</h1>
			{search && (
				<SearchInput
					label='Search'
					ref={inputRef}
					shortcut={shortcutLabel}
					className='w-75 max-tablet:w-56 max-mobile:order-3 max-mobile:w-full'
				/>
			)}
			<NotificationsButton />
			{actions}
		</header>
	)
}
