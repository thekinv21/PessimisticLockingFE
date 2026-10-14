import { isAxiosError } from 'axios'

import type { TApiErrorResponse } from './types'

export function getApiErrorMessage(error: unknown, fallback: string) {
	if (!isAxiosError<TApiErrorResponse>(error)) return fallback

	return error.response?.data?.message ?? fallback
}
