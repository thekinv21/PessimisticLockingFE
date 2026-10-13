export const ROUTES = {
	home: '/',
	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
} as const

export const SESSION_EXPIRED_PARAM = {
	key: 'session',
	value: 'expired',
} as const

export const SESSION_EXPIRED_URL = `${ROUTES.login}?${SESSION_EXPIRED_PARAM.key}=${SESSION_EXPIRED_PARAM.value}`
