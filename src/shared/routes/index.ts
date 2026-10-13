export const ROUTES = {
	home: '/dashboard',
	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
	profile: '/profile',
	users: '/users',
	roles: '/roles',
	posts: '/posts',
} as const

export const SESSION_EXPIRED_PARAM = {
	key: 'session',
	value: 'expired',
} as const

export const SESSION_EXPIRED_URL = `${ROUTES.login}?${SESSION_EXPIRED_PARAM.key}=${SESSION_EXPIRED_PARAM.value}`
