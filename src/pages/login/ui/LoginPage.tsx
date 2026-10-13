'use client'

import Link from 'next/link'

import { ROUTES } from '@/shared/routes'
import { Logo } from '@/shared/ui'

import { LoginForm } from './LoginForm'

export function LoginPage() {
	return (
		<div className='grid min-h-dvh w-full'>
			<section className='flex min-h-dvh items-center justify-center px-6 py-10 mobile:px-12'>
				<div className='flex w-full max-w-sm animate-rise flex-col'>
					<Logo />
					<h1 className='mt-12 font-display text-[32px] leading-10 font-extrabold tracking-tight text-ink'>
						Sign in
					</h1>
					<p className='mt-3 text-[15px] leading-6 text-ink-muted'>
						Welcome back. Enter your details to continue.
					</p>
					<div className='mt-10'>
						<LoginForm />
					</div>
					<p className='mt-8 text-ink-muted'>
						Don’t have an account?{' '}
						<Link
							href={ROUTES.register}
							className='rounded font-semibold text-brand hover:text-brand-strong hover:underline'
						>
							Create one
						</Link>
					</p>
				</div>
			</section>
		</div>
	)
}
