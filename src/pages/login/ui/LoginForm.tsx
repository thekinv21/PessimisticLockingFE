'use client'

import Link from 'next/link'

import { LockKeyhole, Mail } from 'lucide-react'

import { ROUTES } from '@/shared/routes'
import { Button, Checkbox, PasswordField, TextField } from '@/shared/ui'

import { useLoginForm } from '../model/useLoginForm'

export function LoginForm() {
	const { register, errors, isPending, onSubmit } = useLoginForm()

	return (
		<form onSubmit={onSubmit} noValidate className='flex flex-col gap-5'>
			{errors.root && (
				<p
					role='alert'
					className='animate-shake rounded-xl bg-danger-soft px-4 py-3 text-danger-strong'
				>
					{errors.root.message}
				</p>
			)}
			<TextField
				label='Email'
				type='email'
				autoComplete='username'
				inputMode='email'
				spellCheck={false}
				placeholder='name@company.com'
				leading={<Mail className='size-4.5' aria-hidden />}
				error={errors.email?.message}
				{...register('email')}
			/>
			<PasswordField
				label='Password'
				autoComplete='current-password'
				placeholder='Enter your password'
				leading={<LockKeyhole className='size-4.5' aria-hidden />}
				error={errors.password?.message}
				{...register('password')}
			/>
			<div className='flex items-center justify-between gap-4'>
				<Checkbox label='Remember me' />
				<Link
					href={ROUTES.forgotPassword}
					className='rounded font-semibold text-brand hover:text-brand-strong hover:underline'
				>
					Forgot password?
				</Link>
			</div>
			<Button type='submit' pending={isPending} className='mt-1'>
				{isPending ? 'Signing in…' : 'Sign in'}
			</Button>
		</form>
	)
}
