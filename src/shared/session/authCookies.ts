import { cookies } from 'next/headers'
import type { NextResponse } from 'next/server'

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
 * The access cookie is dropped a bit early, so the token never expires
 * mid-request.
 */

const ACCESS_COOKIE_EARLY_EXPIRY_MS: number = 30_000

type TCookieWriter = Pick<NextResponse['cookies'], 'set'>

export function writeAuthCookies(
	cookieStore: TCookieWriter,
	tokens: TAuthTokens,
) {
	const accessTokenExpireAt = Date.parse(tokens.accessTokenExpireAt)

	cookieStore.set(AUTH_COOKIES.accessToken, tokens.accessToken, {
		...COOKIE_OPTIONS,
		expires: new Date(accessTokenExpireAt - ACCESS_COOKIE_EARLY_EXPIRY_MS),
	})
	cookieStore.set(AUTH_COOKIES.refreshToken, tokens.refreshToken, {
		...COOKIE_OPTIONS,
		expires: new Date(tokens.refreshTokenExpireAt),
	})
}

export async function setAuthCookies(tokens: TAuthTokens) {
	writeAuthCookies(await cookies(), tokens)
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
