import { type NextRequest, NextResponse } from 'next/server'

import { AUTH_COOKIES } from '@/shared/config'
import { ROUTES, SESSION_EXPIRED_PARAM } from '@/shared/routes'
import { refreshAuthTokens, writeAuthCookies } from '@/shared/session'

const AUTH_ROUTES: string[] = [
	ROUTES.login,
	ROUTES.register,
	ROUTES.forgotPassword,
]

function guestResponse(request: NextRequest, isAuthRoute: boolean) {
	const response = isAuthRoute
		? NextResponse.next()
		: NextResponse.redirect(new URL(ROUTES.login, request.url))

	response.cookies.delete(AUTH_COOKIES.accessToken)
	response.cookies.delete(AUTH_COOKIES.refreshToken)

	return response
}

function userResponse(request: NextRequest, isAuthRoute: boolean) {
	return isAuthRoute
		? NextResponse.redirect(new URL(ROUTES.home, request.url))
		: NextResponse.next({ request: { headers: request.headers } })
}

export async function proxy(request: NextRequest) {
	const { pathname, searchParams } = request.nextUrl

	const isAuthRoute: boolean = AUTH_ROUTES.includes(pathname)

	const isSessionExpired: boolean =
		searchParams.get(SESSION_EXPIRED_PARAM.key) === SESSION_EXPIRED_PARAM.value

	const accessToken: string | undefined = request.cookies.get(
		AUTH_COOKIES.accessToken,
	)?.value

	const refreshToken: string | undefined = request.cookies.get(
		AUTH_COOKIES.refreshToken,
	)?.value

	if (isSessionExpired || !refreshToken) {
		return guestResponse(request, isAuthRoute)
	}

	if (accessToken) return userResponse(request, isAuthRoute)

	/**
	 * Access token expired: get a new pair with the refresh token.
	 */

	const tokens = await refreshAuthTokens(refreshToken)

	if (!tokens) return guestResponse(request, isAuthRoute)

	/**
	 * The page rendered for this request already uses the new tokens
	 */

	request.cookies.set(AUTH_COOKIES.accessToken, tokens.accessToken)
	request.cookies.set(AUTH_COOKIES.refreshToken, tokens.refreshToken)

	const response = userResponse(request, isAuthRoute)

	writeAuthCookies(response.cookies, tokens)

	return response
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
