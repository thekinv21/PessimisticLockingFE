import axios from 'axios'

import { API_URL } from '@/shared/config'

export const api = axios.create({
	baseURL: API_URL,
	timeout: 10_000,
	withCredentials: true,
})
