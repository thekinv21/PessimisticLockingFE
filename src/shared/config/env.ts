export const API_URL =
	process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4200/api'

export const API_PROXY_PATH = '/api'

export const STORAGE_SECRET = process.env.NEXT_PUBLIC_STORAGE_SECRET ?? ''

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
