import type { ReactNode } from 'react'

import { AdminLayout } from '@/app/layouts'

type TLayoutProps = { children: ReactNode }

export default function Layout({ children }: TLayoutProps) {
	return <AdminLayout>{children}</AdminLayout>
}
