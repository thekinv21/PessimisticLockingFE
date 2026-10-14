import { cn } from '@/shared/lib'

import type { TPostField } from '../model/usePostDetail'

type TPostRecordProps = { fields: TPostField[] }

export function PostRecord({ fields }: TPostRecordProps) {
	return (
		<aside
			aria-label='Post record'
			className='self-start rounded-2xl border border-line bg-raised p-5'
		>
			<dl className='flex flex-col gap-4'>
				{fields.map(field => (
					<div key={field.label} className='flex flex-col gap-1'>
						<dt className='text-[13px] text-ink-subtle'>{field.label}</dt>
						<dd
							className={cn(
								'break-all text-[14px] text-ink',
								field.mono && 'font-mono text-[13px]',
							)}
						>
							{field.value}
						</dd>
					</div>
				))}
			</dl>
		</aside>
	)
}
