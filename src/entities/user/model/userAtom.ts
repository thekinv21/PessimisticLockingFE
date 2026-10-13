import { atomWithStorage, createJSONStorage, unwrap } from 'jotai/utils'

import { encryptedStorage } from '@/shared/lib'

import type { TUser } from './types'

const storage = createJSONStorage<TUser | null>(() => encryptedStorage)

export const userAtom = unwrap(
	atomWithStorage<TUser | null>('user', null, storage),
	prev => prev ?? null,
)
