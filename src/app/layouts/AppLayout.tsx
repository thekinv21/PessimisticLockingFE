import type { ReactNode } from 'react'

import { Logo } from '@/shared/ui'

type TAppLayoutProps = { children: ReactNode }

export function AppLayout({ children }: TAppLayoutProps) {
	return (
		<div className='min-h-dvh bg-canvas'>
			<header className='sticky top-0 z-10 border-b border-line bg-canvas/85 backdrop-blur'>
				<div className='mx-auto flex h-16 max-w-4xl items-center px-6 max-mobile:px-4'>
					<Logo />
				</div>
			</header>
			{children}
		</div>
	)
}
