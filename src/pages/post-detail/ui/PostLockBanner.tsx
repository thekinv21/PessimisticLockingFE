import { LockKeyhole } from 'lucide-react'

type TPostLockBannerProps = { holderName: string }

export function PostLockBanner({ holderName }: TPostLockBannerProps) {
	return (
		<p
			role='status'
			className='mt-6 flex items-center gap-2.5 rounded-xl bg-warning-soft px-4 py-3 text-[14px] text-ink'
		>
			<LockKeyhole className='size-4 shrink-0 text-warning' aria-hidden />
			<span>
				<strong className='font-semibold'>{holderName}</strong> is editing this
				post. You can edit or delete it once they finish.
			</span>
		</p>
	)
}
