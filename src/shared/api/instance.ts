import { redirect } from 'next/navigation'

import axios, { isAxiosError } from 'axios'

import { API_PROXY_PATH, API_URL } from '@/shared/config'
import { buildLoginUrl } from '@/shared/routes'

import { PUBLIC_ENDPOINTS } from './endpoints'

const PUBLIC_URIS: string[] = Object.values(PUBLIC_ENDPOINTS)

const isPublicEndpoint = (url?: string) => PUBLIC_URIS.includes(url ?? '')

const isBrowser = typeof window !== 'undefined'

export const instance = axios.create({
	baseURL: isBrowser ? API_PROXY_PATH : API_URL,
})

instance.interceptors.response.use(
	response => response,
	(error: unknown) => {
		const isUnauthorized =
			isAxiosError(error) &&
			error.response?.status === 401 &&
			!isPublicEndpoint(error.config?.url)

		if (!isUnauthorized) return Promise.reject(error)

		if (!isBrowser) redirect(buildLoginUrl({ isSessionExpired: true }))

		const { pathname, search } = window.location

		window.location.replace(
			buildLoginUrl({
				redirectTo: `${pathname}${search}`,
				isSessionExpired: true,
			}),
		)

		return new Promise<never>(() => {})
	},
)
