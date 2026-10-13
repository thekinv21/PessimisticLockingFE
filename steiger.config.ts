import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
	...fsd.configs.recommended,
	{
		// Global user state; more consumers (header, logout) are coming.
		files: ['./src/entities/user/**'],
		rules: { 'fsd/insignificant-slice': 'off' },
	},
])
