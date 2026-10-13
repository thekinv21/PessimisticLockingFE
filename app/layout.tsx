import { ReactNode } from 'react'

import type { Metadata } from 'next'
import { Golos_Text, JetBrains_Mono, Manrope } from 'next/font/google'

import { Providers } from '@/app/entrypoint'

import { APP_NAME } from '@/shared/config'

import './globals.css'

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin', 'cyrillic'],
	weight: ['500', '600', '700', '800'],
})

const golos = Golos_Text({
	variable: '--font-golos',
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
	variable: '--font-jetbrains',
	subsets: ['latin', 'cyrillic'],
	weight: ['500', '600'],
})

export const metadata: Metadata = {
	title: {
		default: APP_NAME,
		template: `%s · ${APP_NAME}`,
	},
	description: APP_NAME,
}

type TRootLayoutProps = {
	children: ReactNode
}

export default async function RootLayout({ children }: TRootLayoutProps) {
	return (
		<html
			lang='en'
			className={`${manrope.variable} ${golos.variable} ${jetbrainsMono.variable} h-full`}
			suppressHydrationWarning
		>
			<body className='min-h-full w-full' suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
