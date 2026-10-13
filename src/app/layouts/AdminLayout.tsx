import type { ReactNode } from 'react'

import { AdminSidebar } from '@/widgets/admin-sidebar'

type TAdminLayoutProps = { children: ReactNode }

export function AdminLayout({ children }: TAdminLayoutProps) {
	return (
		<div className='flex h-dvh min-h-150 overflow-hidden max-mobile:h-auto max-mobile:flex-col max-mobile:overflow-visible'>
			<AdminSidebar />
			<div className='flex h-full min-w-0 flex-auto flex-col max-mobile:h-auto'>
				{children}
			</div>
		</div>
	)
}
