import { isAxiosError } from 'axios'

import { instance, PUBLIC_ENDPOINTS, type TApiResponse } from '@/shared/api'

import type { TAuthTokens } from './authCookies'

const MAX_ATTEMPTS: number = 3
const RETRY_DELAY_MS: number = 500
const REUSE_RESULT_MS: number = 10_000

const refreshesInProgress = new Map<string, Promise<TAuthTokens | null>>()

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * A 4xx means the token is rejected; retrying cannot fix it.
 */

const isRetryable = (error: unknown) =>
	!isAxiosError(error) || !error.response || error.response.status >= 500

async function postRefreshToken(refreshToken: string) {
	const { data: response } = await instance.post<TApiResponse<TAuthTokens>>(
		PUBLIC_ENDPOINTS.refreshToken,
		{ refreshToken },
	)

	return response.data
}

async function requestNewTokens(refreshToken: string) {
	for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
		try {
			return await postRefreshToken(refreshToken)
		} catch (error) {
			if (!isRetryable(error) || attempt === MAX_ATTEMPTS) return null

			await wait(RETRY_DELAY_MS)
		}
	}

	return null
}

/**
 * A refresh token works only once, so parallel requests with the same
 * token share one refresh call instead of each sending their own.
 */

export function refreshAuthTokens(refreshToken: string) {
	const inProgress = refreshesInProgress.get(refreshToken)
	if (inProgress) return inProgress

	const refresh = requestNewTokens(refreshToken)

	refreshesInProgress.set(refreshToken, refresh)
	setTimeout(() => refreshesInProgress.delete(refreshToken), REUSE_RESULT_MS)

	return refresh
}
