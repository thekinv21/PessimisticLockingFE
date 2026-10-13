export const PUBLIC_ENDPOINTS = {
	login: '/v1/auth/login',
	register: '/v1/auth/register',
	refreshToken: '/v1/auth/refresh-token',
} as const

export const PRIVATE_ENDPOINTS = {
	list_of_posts: '/v1/posts',
} as const
