'use client'

import { usePathname } from 'next/navigation'

import { useCurrentUser } from '@/entities/user'

import { ROUTES } from '@/shared/routes'

import { isActivePath } from '../lib/isActivePath'

function toInitials(fullName: string) {
	return fullName
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map(part => part[0].toUpperCase())
		.join('')
}

export function useSidebarProfile() {
	const user = useCurrentUser()
	const pathname = usePathname() ?? ''

	if (!user) return null

	return {
		fullName: user.fullName,
		initials: toInitials(user.fullName),
		role: user.roles.map(role => role.name).join(', '),
		active: isActivePath(pathname, ROUTES.profile),
	}
}
