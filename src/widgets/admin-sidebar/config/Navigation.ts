import {
	FileText,
	LayoutDashboard,
	type LucideIcon,
	ShieldCheck,
	UserCog,
} from 'lucide-react'

import { ROUTES } from '@/shared/routes'

export type TNavItem = {
	href: string
	label: string
	icon: LucideIcon
}

type TNavGroup = {
	label: string
	items: TNavItem[]
}

export const NAVIGATION: TNavGroup[] = [
	{
		label: 'Main',
		items: [
			{ href: ROUTES.home, label: 'Dashboard', icon: LayoutDashboard },
			{ href: ROUTES.posts, label: 'Posts', icon: FileText },
		],
	},
	{
		label: 'Admin',
		items: [
			{ href: ROUTES.users, label: 'Users', icon: UserCog },
			{ href: ROUTES.roles, label: 'Roles & access', icon: ShieldCheck },
		],
	},
]
