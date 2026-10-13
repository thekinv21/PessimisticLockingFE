'use server'

import { unstable_rethrow } from 'next/navigation'

import { isAxiosError } from 'axios'

import {
	instance,
	PUBLIC_ENDPOINTS,
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
		>(PUBLIC_ENDPOINTS.login, parsed.data)

		if (!response.data) {
			return { ok: false, message: 'Something went wrong. Try again.' }
		}

		const { user, ...tokens } = response.data

		await setAuthCookies(tokens)

		return { ok: true, user }
	} catch (error) {
		unstable_rethrow(error)

		if (isAxiosError<TApiErrorResponse>(error) && error.response?.data) {
			return { ok: false, message: error.response.data.message }
		}

		return { ok: false, message: 'Something went wrong. Try again.' }
	}
}
