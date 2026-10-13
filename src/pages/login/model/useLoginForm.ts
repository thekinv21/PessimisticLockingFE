'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useLoginMutation } from '../api'
import { loginSchema, type TLoginValues } from './loginSchema'

export function useLoginForm() {
	const { mutateAsync, isPending } = useLoginMutation()

	const { register, handleSubmit, formState, setError } = useForm<TLoginValues>(
		{
			resolver: zodResolver(loginSchema),
			defaultValues: { email: '', password: '' },
		},
	)

	const onSubmit = handleSubmit(async formData => {
		await mutateAsync(formData).catch((error: Error) => {
			setError('root', { message: error.message })
		})
	})

	return { register, errors: formState.errors, isPending, onSubmit }
}
