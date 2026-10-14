export const ROUTES = {
	home: '/',
	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
	post: (id: number) => `/posts/${id}`,
} as const

export const AUTH_ROUTES: string[] = [
	ROUTES.login,
	ROUTES.register,
	ROUTES.forgotPassword,
]

export const SESSION_EXPIRED_PARAM = {
	key: 'session',
	value: 'expired',
} as const

export const REDIRECT_PARAM = 'redirect'

type TLoginUrlOptions = { redirectTo?: string; isSessionExpired?: boolean }

export function buildLoginUrl({
	redirectTo,
	isSessionExpired,
}: TLoginUrlOptions = {}) {
	const params = new URLSearchParams()

	if (isSessionExpired) {
		params.set(SESSION_EXPIRED_PARAM.key, SESSION_EXPIRED_PARAM.value)
	}

	if (redirectTo && redirectTo !== ROUTES.home) {
		params.set(REDIRECT_PARAM, redirectTo)
	}

	const query = params.toString()

	return query ? `${ROUTES.login}?${query}` : ROUTES.login
}

/**
 * Only same-origin paths are accepted, so a crafted link cannot send
 * the user to another site after sign in.
 */

const URL_BASE: string = 'http://localhost'

export function getSafeRedirectPath(value: string | null | undefined) {
	if (!value?.startsWith('/') || value.startsWith('//')) return ROUTES.home

	const url = new URL(value, URL_BASE)

	if (url.origin !== URL_BASE || AUTH_ROUTES.includes(url.pathname)) {
		return ROUTES.home
	}

	return `${url.pathname}${url.search}`
}
