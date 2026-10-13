'use client'

import { usePathname } from 'next/navigation'

import { NAVIGATION, type TNavItem } from '../config/Navigation'
import { isActivePath } from '../lib/isActivePath'

export type TSidebarItem = TNavItem & {
	active: boolean
}

export type TSidebarGroup = {
	label: string
	items: TSidebarItem[]
}

export function useSidebarNav(): TSidebarGroup[] {
	const pathname = usePathname() ?? ''

	return NAVIGATION.map(group => ({
		label: group.label,
		items: group.items.map(item => ({
			...item,
			active: isActivePath(pathname, item.href),
		})),
	}))
}
