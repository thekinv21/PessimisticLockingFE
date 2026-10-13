'use server'

import { isAxiosError } from 'axios'

import {
	instance,
	type TApiErrorResponse,
	type TApiResponse,
} from '@/shared/api'
import { setAuthCookies } from '@/shared/session'

import { loginSchema, type TLoginValues } from '../model/loginSchema'
import type { TLoginActionResult, TLoginResponse } from './types'

export async function loginAction(
	values: TLoginValues,
): Promise<TLoginActionResult> {
	const parsed = loginSchema.safeParse(values)
	if (!parsed.success) {
		return { ok: false, message: 'Enter a valid email and password' }
	}

	try {
		const { data: response } = await instance.post<
			TApiResponse<TLoginResponse>
		>('/v1/auth/login', parsed.data)

		if (!response.data) {
			return { ok: false, message: 'Something went wrong. Try again.' }
		}

		const { user, ...tokens } = response.data

		await setAuthCookies(tokens)

		return { ok: true, user }
	} catch (error) {
		if (isAxiosError<TApiErrorResponse>(error) && error.response?.data) {
			return { ok: false, message: error.response.data.message }
		}

		return { ok: false, message: 'Something went wrong. Try again.' }
	}
}
