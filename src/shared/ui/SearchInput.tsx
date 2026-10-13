import type { InputHTMLAttributes, Ref } from 'react'

import { Search } from 'lucide-react'

import { cn } from '@/shared/lib'

type TSearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string
	shortcut?: string
	ref?: Ref<HTMLInputElement>
}

export function SearchInput(props: TSearchInputProps) {
	const { label, shortcut, className, ...rest } = props

	return (
		<label className={cn('relative flex items-center', className)}>
			<span className='sr-only'>{label}</span>
			<Search
				className='pointer-events-none absolute left-4 size-4.5 text-ink-subtle'
				aria-hidden
			/>
			<input
				type='search'
				placeholder={label}
				{...rest}
				className='h-11 w-full rounded-xl border border-line bg-raised pr-16 pl-11 text-[15px] text-ink shadow-press transition-colors outline-none focus:border-brand focus:bg-surface [&::-webkit-search-cancel-button]:hidden'
			/>
			{shortcut && (
				<kbd className='pointer-events-none absolute right-2 rounded-lg bg-surface px-2 font-mono text-[11px] leading-6 text-ink-muted shadow-clay-sm'>
					{shortcut}
				</kbd>
			)}
		</label>
	)
}
