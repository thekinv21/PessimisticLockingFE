import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
	...fsd.configs.recommended,
	{
		// Global user state; more consumers (header, logout) are coming.
		files: ['./src/entities/user/**'],
		rules: { 'fsd/insignificant-slice': 'off' },
	},
	{
		// Post list query is shared by dashboard and upcoming post pages.
		files: ['./src/entities/post/**'],
		rules: { 'fsd/insignificant-slice': 'off' },
	},
])
