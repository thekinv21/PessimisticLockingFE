import type { TUser } from '@/entities/user'

import type { TAuthTokens } from '@/shared/session'

export type TLoginResponse = TAuthTokens & {
	user: TUser
}

export type TLoginActionResult =
	{ ok: true; user: TUser } | { ok: false; message: string }
