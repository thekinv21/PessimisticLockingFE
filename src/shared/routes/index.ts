export const ROUTES = {
	home: '/',
	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
} as const

/** Added to the login URL when a request returned 401; the proxy clears auth cookies on it. */
export const SESSION_EXPIRED_PARAM = {
	key: 'session',
	value: 'expired',
} as const

export const SESSION_EXPIRED_URL = `${ROUTES.login}?${SESSION_EXPIRED_PARAM.key}=${SESSION_EXPIRED_PARAM.value}`
