import { type NextRequest, NextResponse } from 'next/server'

import { AUTH_COOKIES } from '@/shared/config'
import { ROUTES } from '@/shared/routes'

const AUTH_ROUTES: string[] = [
	ROUTES.login,
	ROUTES.register,
	ROUTES.forgotPassword,
]

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	const isAuthenticated = request.cookies.has(AUTH_COOKIES.accessToken)

	const isAuthRoute = AUTH_ROUTES.includes(pathname)

	if (!isAuthenticated && !isAuthRoute) {
		return NextResponse.redirect(new URL(ROUTES.login, request.url))
	}

	if (isAuthenticated && isAuthRoute) {
		return NextResponse.redirect(new URL(ROUTES.home, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
