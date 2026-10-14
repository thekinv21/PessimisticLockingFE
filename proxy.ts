import { type NextRequest, NextResponse } from 'next/server'

import { API_PROXY_PATH, API_URL, AUTH_COOKIES } from '@/shared/config'
import {
	AUTH_ROUTES,
	buildLoginUrl,
	getSafeRedirectPath,
	REDIRECT_PARAM,
	SESSION_EXPIRED_PARAM,
} from '@/shared/routes'
import { refreshAuthTokens, writeAuthCookies } from '@/shared/session'

function guestResponse(request: NextRequest, isAuthRoute: boolean) {
	const { pathname, search } = request.nextUrl

	const loginUrl = buildLoginUrl({ redirectTo: `${pathname}${search}` })

	const response = isAuthRoute
		? NextResponse.next()
		: NextResponse.redirect(new URL(loginUrl, request.url))

	response.cookies.delete(AUTH_COOKIES.accessToken)
	response.cookies.delete(AUTH_COOKIES.refreshToken)

	return response
}

function userResponse(request: NextRequest, isAuthRoute: boolean) {
	if (!isAuthRoute) {
		return NextResponse.next({ request: { headers: request.headers } })
	}

	const redirectTo = getSafeRedirectPath(
		request.nextUrl.searchParams.get(REDIRECT_PARAM),
	)

	return NextResponse.redirect(new URL(redirectTo, request.url))
}

function forwardToApi(request: NextRequest, accessToken?: string) {
	const { pathname, search } = request.nextUrl

	const apiPath = pathname.slice(API_PROXY_PATH.length)
	const target = new URL(`${API_URL}${apiPath}${search}`)

	const headers = new Headers(request.headers)
	if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)

	return NextResponse.rewrite(target, { request: { headers } })
}

/**
 * Browser API calls: the access token lives in an httpOnly cookie,
 * so it is attached here. Without a session the backend answers 401.
 */

async function apiProxy(request: NextRequest) {
	const accessToken = request.cookies.get(AUTH_COOKIES.accessToken)?.value
	const refreshToken = request.cookies.get(AUTH_COOKIES.refreshToken)?.value

	if (accessToken || !refreshToken) return forwardToApi(request, accessToken)

	const tokens = await refreshAuthTokens(refreshToken)

	if (!tokens) return forwardToApi(request)

	const response = forwardToApi(request, tokens.accessToken)

	writeAuthCookies(response.cookies, tokens)

	return response
}

export async function proxy(request: NextRequest) {
	const { pathname, searchParams } = request.nextUrl

	if (pathname.startsWith(`${API_PROXY_PATH}/`)) return apiProxy(request)

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
	matcher: [
		'/api/:path*',
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
	],
}
