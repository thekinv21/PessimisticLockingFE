'use client'

import { useAtomValue } from 'jotai'

import { userAtom } from './userAtom'

export function useCurrentUser() {
	return useAtomValue(userAtom)
}
