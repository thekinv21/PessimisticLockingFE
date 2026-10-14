import { z } from 'zod'

export const postFormSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, 'Enter a title')
		.max(200, 'Keep the title under 200 characters'),
	description: z
		.string()
		.trim()
		.max(5000, 'Keep the description under 5,000 characters'),
})

export type TPostFormValues = z.infer<typeof postFormSchema>
