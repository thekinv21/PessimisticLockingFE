export type TLoggedInUserRole = {
	id: string
	name: string
}

export type TLoggedInUser = {
	id: string
	fullName: string
	email: string
	avatar: string | null
	isActive: boolean
	roles: TLoggedInUserRole[]
	createdAt?: string
	updatedAt?: string
}

export type TLoginResponse = {
	user: TLoggedInUser
	accessToken: string
	accessTokenExpireAt: string
	refreshToken: string
	refreshTokenExpireAt: string
}
