import { useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { login } from '../api/login'
import { loginSchema, type TLoginValues } from './loginSchema'

export function useLoginForm() {
	const [isPending, startTransition] = useTransition()
	const { register, handleSubmit, setError, formState } = useForm<TLoginValues>(
		{
			resolver: zodResolver(loginSchema),
			defaultValues: { email: '', password: '', rememberMe: false },
		},
	)

	const onSubmit = handleSubmit(values =>
		startTransition(async () => {
			const result = await login(values)
			if (result?.error) setError('root', { message: result.error })
		}),
	)

	return { register, errors: formState.errors, isPending, onSubmit }
}
