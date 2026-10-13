import type { Metadata } from 'next'

import { DashboardPage } from '@/pages/dashboard'

export const metadata: Metadata = {
	title: 'Dashboard',
}

export default function Page() {
	return <DashboardPage />
}
