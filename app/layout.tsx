import type { Metadata } from 'next'
import { Golos_Text, JetBrains_Mono, Manrope } from 'next/font/google'

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
		default: 'Pessimistic Locking',
		template: '%s · Pessimistic Locking',
	},
	description: 'Pessimistic Locking',
}

type TRootLayoutProps = LayoutProps<'/'>

export default async function RootLayout({ children }: TRootLayoutProps) {
	return (
		<html
			lang='en'
			className={`${manrope.variable} ${golos.variable} ${jetbrainsMono.variable} h-full`}
			suppressHydrationWarning
		>
			<body className='min-h-full w-full' suppressHydrationWarning>
				<>{children}</>
			</body>
		</html>
	)
}
