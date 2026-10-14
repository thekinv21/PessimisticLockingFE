import type { TLockReleaseReason } from '../api/lockSocket'

const LOST_LOCK_MESSAGES: Partial<Record<TLockReleaseReason, string>> = {
	expired:
		'Your edit lock expired after 5 minutes without changes. Cancel and edit again to keep working.',
	disconnected:
		'The live connection dropped and your edit lock was released. Cancel and edit again to keep working.',
	released:
		'Your edit lock was released. Cancel and edit again to keep working.',
}

export const lostLockMessage = (reason: TLockReleaseReason | null) =>
	reason ? (LOST_LOCK_MESSAGES[reason] ?? null) : null
