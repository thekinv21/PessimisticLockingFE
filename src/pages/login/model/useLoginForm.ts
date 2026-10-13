'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import {
	instance,
	type TApiErrorResponse,
	type TApiResponse,
} from '@/shared/api'

import type { TLoginResponse } from '../api'
import { loginSchema, type TLoginValues } from './loginSchema'

export function useLoginForm() {
	const { register, handleSubmit, formState } = useForm<TLoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	})

	const API_VERSION: string = 'v1'
	const API_BASE_URL: string = `/${API_VERSION}/auth/login`

	/**
	 * useMutation<TData, TError, TVariables>
	 *
	 * Successfully response (TData)
	 * Error response (TError)
	 * Request data (TVariables)
	 *
	 */

	const { mutateAsync, isPending } = useMutation<
		TApiResponse<TLoginResponse>,
		TApiErrorResponse,
		TLoginValues
	>({
		mutationKey: ['login'],
		mutationFn: async (data: TLoginValues) => {
			const response = await instance.post<TApiResponse<TLoginResponse>>(
				API_BASE_URL,
				data,
			)
			return response.data
		},
		onSuccess({ data }) {
			console.log('response data', data)
		},
		onError: error => {
			console.log('error', error)
		},
	})

	const onSubmit = handleSubmit(formData => mutateAsync(formData))

	return { register, errors: formState.errors, isPending, onSubmit }
}
