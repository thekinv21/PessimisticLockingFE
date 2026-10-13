import Link from 'next/link'

import { APP_NAME } from '@/shared/config'
import { ROUTES } from '@/shared/routes'

import { LogoMark } from './LogoMark'

export function Logo() {
	return (
		<Link
			href={ROUTES.home}
			aria-label={`${APP_NAME} home`}
			className='inline-flex items-center gap-1.5 rounded-lg'
		>
			<LogoMark className='size-11 shrink-0' />
			<span className='font-display text-lg leading-6 font-extrabold tracking-tight text-ink'>
				{APP_NAME}
			</span>
		</Link>
	)
}
