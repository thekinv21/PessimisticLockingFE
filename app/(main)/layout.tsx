import type { ReactNode } from 'react'

import { AppLayout } from '@/app/layouts'

type TLayoutProps = { children: ReactNode }

export default function Layout({ children }: TLayoutProps) {
	return <AppLayout>{children}</AppLayout>
}
