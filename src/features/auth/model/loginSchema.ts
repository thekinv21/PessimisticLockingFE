import { z } from 'zod'

export const loginSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, 'Enter your email')
		.pipe(z.email('Enter an email like name@company.com')),
	password: z.string().min(1, 'Enter your password'),
	rememberMe: z.boolean(),
})

export type TLoginValues = z.infer<typeof loginSchema>
