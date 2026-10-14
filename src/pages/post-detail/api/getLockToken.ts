'use server'

import { getAuthCookies } from '@/shared/session'

export async function getLockToken() {
	const { accessToken } = await getAuthCookies()

	return accessToken ?? ''
}
