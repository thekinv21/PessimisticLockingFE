import { type NextRequest, NextResponse } from 'next/server'

import { AUTH_COOKIES } from '@/shared/config'
import { ROUTES, SESSION_EXPIRED_PARAM } from '@/shared/routes'

const AUTH_ROUTES: string[] = [
	ROUTES.login,
	ROUTES.register,
	ROUTES.forgotPassword,
]

function clearAuthCookies(response: NextResponse) {
	response.cookies.delete(AUTH_COOKIES.accessToken)
	response.cookies.delete(AUTH_COOKIES.refreshToken)
	return response
}

export function proxy(request: NextRequest) {
	const { pathname, searchParams } = request.nextUrl

	const isAuthRoute = AUTH_ROUTES.includes(pathname)

	const isSessionExpired =
		searchParams.get(SESSION_EXPIRED_PARAM.key) === SESSION_EXPIRED_PARAM.value

	const isAuthenticated =
		!isSessionExpired &&
		request.cookies.has(AUTH_COOKIES.accessToken) &&
		request.cookies.has(AUTH_COOKIES.refreshToken)

	if (!isAuthenticated) {
		const response = isAuthRoute
			? NextResponse.next()
			: NextResponse.redirect(new URL(ROUTES.login, request.url))

		return clearAuthCookies(response)
	}

	if (isAuthRoute) {
		return NextResponse.redirect(new URL(ROUTES.home, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
