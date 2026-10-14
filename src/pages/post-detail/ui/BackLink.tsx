import Link from 'next/link'

import { ArrowLeft } from 'lucide-react'

import { cn } from '@/shared/lib'
import { ROUTES } from '@/shared/routes'

const TONES = {
	default: 'text-ink-muted hover:text-ink',
	inverse: 'text-white/80 hover:text-white',
}

type TBackLinkProps = { tone?: keyof typeof TONES }

export function BackLink({ tone = 'default' }: TBackLinkProps) {
	return (
		<Link
			href={ROUTES.home}
			className={cn(
				'inline-flex w-fit items-center gap-1.5 rounded font-semibold',
				TONES[tone],
			)}
		>
			<ArrowLeft className='size-4' aria-hidden />
			All posts
		</Link>
	)
}
