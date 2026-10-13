'use client'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'

import { type TUser, userAtom } from '@/entities/user'

import { ROUTES } from '@/shared/routes'

import type { TLoginValues } from '../model/loginSchema'
import { loginAction } from './loginAction'

export function useLoginMutation() {
	const router = useRouter()
	const setUser = useSetAtom(userAtom)

	/**
	 * useMutation<TData, TError, TVariables>
	 *
	 * Successfully response (TData)
	 * Error response (TError)
	 * Request data (TVariables)
	 *
	 */

	return useMutation<TUser, Error, TLoginValues>({
		mutationKey: ['login'],
		mutationFn: async (data: TLoginValues) => {
			const result = await loginAction(data)
			if (!result.ok) throw new Error(result.message)
			return result.user
		},
		onSuccess: async user => {
			await setUser(user)
			router.replace(ROUTES.home)
		},
	})
}
