import Link from 'next/link'

import { LockKeyhole } from 'lucide-react'

import { ROUTES } from '@/shared/routes'

export function Logo() {
	return (
		<Link
			href={ROUTES.home}
			className='inline-flex items-center gap-2.5 rounded-lg'
		>
			<span className='grid size-9 place-items-center rounded-[10px] bg-brand text-on-brand shadow-brand'>
				<LockKeyhole className='size-4.5' aria-hidden />
			</span>
			<span className='font-display text-base font-extrabold tracking-tight text-ink'>
				Pessimistic Locking
			</span>
		</Link>
	)
}
