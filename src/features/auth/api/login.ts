'use server'

import { redirect } from 'next/navigation'

import { isAxiosError } from 'axios'

import { api } from '@/shared/api'
import { ROUTES } from '@/shared/routes'

import { loginSchema, type TLoginValues } from '../model/loginSchema'

export type TLoginResult = { error: string }

export async function login(values: TLoginValues): Promise<TLoginResult> {
	const parsed = loginSchema.safeParse(values)
	if (!parsed.success)
		return { error: 'Check the highlighted fields and try again.' }

	try {
		await api.post('/auth/login', parsed.data)
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 401) {
			return {
				error: 'That email and password don’t match. Check both and try again.',
			}
		}
		return {
			error: 'Can’t reach the server. Check your connection and try again.',
		}
	}

	redirect(ROUTES.home)
}
