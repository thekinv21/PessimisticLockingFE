export type TUserRole = {
	id: string
	name: string
}

export type TUser = {
	id: string
	fullName: string
	email: string
	avatar: string | null
	isActive: boolean
	roles: TUserRole[]
	createdAt?: string
	updatedAt?: string
}
