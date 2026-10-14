import type { ReactNode } from 'react'

import { Logo } from '@/shared/ui'

type TAppLayoutProps = { children: ReactNode }

export function AppLayout({ children }: TAppLayoutProps) {
	return (
		<div className='flex h-dvh flex-col bg-canvas'>
			<header className='shrink-0 border-b border-line bg-canvas'>
				<div className='mx-auto flex h-16 max-w-4xl items-center px-6 max-mobile:px-4'>
					<Logo />
				</div>
			</header>
			<div className='flex min-h-0 grow flex-col overflow-y-auto'>
				{children}
			</div>
		</div>
	)
}
