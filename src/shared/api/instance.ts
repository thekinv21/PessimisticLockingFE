import { redirect } from 'next/navigation'

import axios, { isAxiosError } from 'axios'

import { API_URL } from '@/shared/config'
import { SESSION_EXPIRED_URL } from '@/shared/routes'

import { PUBLIC_ENDPOINTS } from './endpoints'

const PUBLIC_URIS: string[] = Object.values(PUBLIC_ENDPOINTS)

const isPublicEndpoint = (url?: string) => PUBLIC_URIS.includes(url ?? '')

export const instance = axios.create({
	baseURL: API_URL,
})

instance.interceptors.request.use(async config => {
	if (typeof window !== 'undefined' || isPublicEndpoint(config.url)) {
		return config
	}

	const { getAuthCookies } = await import('@/shared/session')
	const { accessToken } = await getAuthCookies()

	if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	response => response,
	(error: unknown) => {
		const isUnauthorized =
			isAxiosError(error) &&
			error.response?.status === 401 &&
			!isPublicEndpoint(error.config?.url)

		if (!isUnauthorized) return Promise.reject(error)

		if (typeof window === 'undefined') redirect(SESSION_EXPIRED_URL)

		window.location.replace(SESSION_EXPIRED_URL)

		return new Promise<never>(() => {})
	},
)
