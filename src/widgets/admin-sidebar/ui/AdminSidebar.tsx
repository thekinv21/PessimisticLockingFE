'use client'

import { useSidebarNav } from '../model/useSidebarNav'
import { useSidebarProfile } from '../model/useSidebarProfile'
import { SidebarBrand } from './SidebarBrand'
import { SidebarNav } from './SidebarNav'
import { SidebarProfileLink } from './SidebarProfileLink'

export function AdminSidebar() {
	const groups = useSidebarNav()
	const profile = useSidebarProfile()

	return (
		<aside
			aria-label='Sidebar'
			className='flex h-full w-61 shrink-0 flex-col gap-2 overflow-y-auto bg-surface px-3 py-3.5 shadow-clay-md scrollbar-none max-laptop:w-17 max-laptop:px-2 max-laptop:py-3 max-mobile:h-auto max-mobile:w-auto max-mobile:flex-row max-mobile:items-center max-mobile:overflow-x-auto max-mobile:p-2'
		>
			<SidebarBrand />
			<SidebarNav groups={groups} />
			{profile && <SidebarProfileLink {...profile} />}
		</aside>
	)
}
