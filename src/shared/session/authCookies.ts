import { cookies } from 'next/headers'

import { AUTH_COOKIES, IS_PRODUCTION } from '@/shared/config'

export type TAuthTokens = {
	accessToken: string
	accessTokenExpireAt: string
	refreshToken: string
	refreshTokenExpireAt: string
}

const COOKIE_OPTIONS = {
	httpOnly: true,
	secure: IS_PRODUCTION,
	sameSite: 'lax',
	path: '/',
} as const

/**
 * Server-only: call from Server Actions, Route Handlers or
 * Server Components.
 * */

export async function setAuthCookies(tokens: TAuthTokens) {
	const cookieStore = await cookies()

	cookieStore.set(AUTH_COOKIES.accessToken, tokens.accessToken, {
		...COOKIE_OPTIONS,
		expires: new Date(tokens.accessTokenExpireAt),
	})
	cookieStore.set(AUTH_COOKIES.refreshToken, tokens.refreshToken, {
		...COOKIE_OPTIONS,
		expires: new Date(tokens.refreshTokenExpireAt),
	})
}

export async function getAuthCookies() {
	const cookieStore = await cookies()

	return {
		accessToken: cookieStore.get(AUTH_COOKIES.accessToken)?.value,
		refreshToken: cookieStore.get(AUTH_COOKIES.refreshToken)?.value,
	}
}

export async function clearAuthCookies() {
	const cookieStore = await cookies()

	cookieStore.delete(AUTH_COOKIES.accessToken)
	cookieStore.delete(AUTH_COOKIES.refreshToken)
}
