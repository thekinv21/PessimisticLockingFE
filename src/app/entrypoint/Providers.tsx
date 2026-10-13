'use client'

import { ReactNode, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type TProvidersProps = {
	children: ReactNode
}

export const Providers = ({ children }: TProvidersProps) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 60 * 1000,
					},
				},
			}),
	)

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
