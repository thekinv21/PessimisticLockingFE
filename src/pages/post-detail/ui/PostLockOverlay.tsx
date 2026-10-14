'use client'

import { LockKeyhole } from 'lucide-react'
import { createPortal } from 'react-dom'

import { BackLink } from './BackLink'

type TPostLockOverlayProps = { holderName: string; holderInitials: string }

export function PostLockOverlay({
	holderName,
	holderInitials,
}: TPostLockOverlayProps) {
	return createPortal(
		<div className='fixed inset-0 z-50 grid animate-fade place-items-center bg-black/50 px-4 backdrop-blur-sm'>
			<div
				role='status'
				className='flex w-full max-w-md animate-pop flex-col items-center text-center'
			>
				<span className='grid size-20 place-items-center rounded-full bg-white/10'>
					<span className='grid size-14 place-items-center rounded-full bg-warning-soft text-warning'>
						<LockKeyhole className='size-6' aria-hidden />
					</span>
				</span>
				<p className='mt-6 font-display text-[12px] font-bold tracking-[0.14em] text-amber-300 uppercase'>
					Locked for editing
				</p>
				<h2 className='mt-2 font-display text-2xl leading-8 font-extrabold tracking-tight text-balance text-white'>
					Someone is working on this post
				</h2>
				<div className='mt-5 flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1.5 pr-4 pl-1.5'>
					<span
						aria-hidden
						className='grid size-7 place-items-center rounded-full bg-brand-soft font-display text-[12px] font-extrabold text-brand-strong'
					>
						{holderInitials}
					</span>
					<span className='font-semibold text-white'>{holderName}</span>
					<span className='size-2 animate-blink rounded-full bg-emerald-400' />
					<span className='text-[13px] text-white/80'>editing now</span>
				</div>
				<p className='mt-5 max-w-xs text-[15px] leading-6 text-pretty text-white/80'>
					You can edit or delete it as soon as they save or cancel. This screen
					closes on its own.
				</p>
				<div className='mt-7 flex w-full justify-center border-t border-white/20 pt-5'>
					<BackLink tone='inverse' />
				</div>
			</div>
		</div>,
		document.body,
	)
}
