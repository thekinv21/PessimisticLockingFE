import type { ReactNode } from 'react'

type TInlineAlertProps = { children: ReactNode }

export function InlineAlert({ children }: TInlineAlertProps) {
	return (
		<p
			role='alert'
			className='animate-shake rounded-xl bg-danger-soft px-4 py-3 text-[14px] leading-6 text-danger-strong'
		>
			{children}
		</p>
	)
}
