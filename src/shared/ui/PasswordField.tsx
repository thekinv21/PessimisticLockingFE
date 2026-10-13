'use client'

import type { ComponentProps } from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { useToggle } from '@/shared/lib'

import { TextField } from './TextField'

type TPasswordFieldProps = Omit<
	ComponentProps<typeof TextField>,
	'type' | 'trailing'
>

export function PasswordField(props: TPasswordFieldProps) {
	const [isVisible, toggleVisible] = useToggle()
	const Icon = isVisible ? EyeOff : Eye

	return (
		<TextField
			{...props}
			type={isVisible ? 'text' : 'password'}
			trailing={
				<button
					type='button'
					onClick={toggleVisible}
					aria-label={isVisible ? 'Hide password' : 'Show password'}
					aria-pressed={isVisible}
					className='grid size-9 place-items-center rounded-lg text-ink-subtle transition-colors hover:bg-sunken hover:text-ink'
				>
					<Icon className='size-4.5' aria-hidden />
				</button>
			}
		/>
	)
}
