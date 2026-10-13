import { STORAGE_SECRET } from '@/shared/config'

const IV_LENGTH = 12

const getKey = () =>
	crypto.subtle
		.digest('SHA-256', new TextEncoder().encode(STORAGE_SECRET))
		.then(hash =>
			crypto.subtle.importKey('raw', hash, 'AES-GCM', false, [
				'encrypt',
				'decrypt',
			]),
		)

/** localStorage with AES-GCM encryption. Tampered values are removed and read as null. */

export const encryptedStorage = {
	async getItem(key: string) {
		const stored = localStorage.getItem(key)
		if (!stored) return null

		try {
			const bytes = Uint8Array.from(atob(stored), char => char.charCodeAt(0))
			const iv = bytes.slice(0, IV_LENGTH)
			const data = await crypto.subtle.decrypt(
				{ name: 'AES-GCM', iv },
				await getKey(),
				bytes.slice(IV_LENGTH),
			)
			return new TextDecoder().decode(data)
		} catch {
			localStorage.removeItem(key)
			return null
		}
	},

	async setItem(key: string, value: string) {
		const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))
		const data = await crypto.subtle.encrypt(
			{ name: 'AES-GCM', iv },
			await getKey(),
			new TextEncoder().encode(value),
		)
		localStorage.setItem(
			key,
			btoa(String.fromCharCode(...iv, ...new Uint8Array(data))),
		)
	},

	async removeItem(key: string) {
		localStorage.removeItem(key)
	},
}
