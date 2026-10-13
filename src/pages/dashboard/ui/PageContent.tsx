import type { ReactNode } from 'react'

type TPageContentProps = { children: ReactNode }

export function PageContent({ children }: TPageContentProps) {
	return (
		<main className='flex min-h-0 flex-auto animate-rise flex-col gap-4 overflow-auto px-6 pt-2 pb-6 scrollbar-thin max-mobile:overflow-visible max-mobile:px-4'>
			{children}
		</main>
	)
}
