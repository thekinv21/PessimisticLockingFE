import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'

import { ROUTES } from '@/shared/routes'

export function BackLink() {
	return (
		<Link
			href={ROUTES.home}
			className='inline-flex w-fit items-center gap-1.5 rounded font-semibold text-ink-muted hover:text-ink'
		>
			<ArrowLeft className='size-4' aria-hidden />
			All posts
		</Link>
	)
}
