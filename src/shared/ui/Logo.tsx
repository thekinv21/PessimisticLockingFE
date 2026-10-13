import Link from 'next/link'

import { ROUTES } from '@/shared/routes'

import { LogoMark } from './LogoMark'

export function Logo() {
	return (
		<Link
			href={ROUTES.home}
			aria-label='Pessimistic Locking home'
			className='inline-flex items-center gap-1.5 rounded-lg'
		>
			<LogoMark className='size-11 shrink-0' />
			<span className='font-display text-lg leading-6 font-extrabold tracking-tight text-ink'>
				Pessimistic Locking
			</span>
		</Link>
	)
}
