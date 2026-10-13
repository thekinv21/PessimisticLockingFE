'use client'

import { usePostListQuery } from '@/entities/post'

import { PageContent } from './PageContent'
import { PageHeader } from './PageHeader'

export function DashboardPage() {
	const { data, isPending, isError } = usePostListQuery({
		offset: 0,
		limit: 10,
	})

	return (
		<>
			<PageHeader title='Dashboard' />
			<PageContent>
				{isPending && <p className='text-ink-muted'>Loading posts…</p>}
				{isError && <p className='text-danger'>Failed to load posts.</p>}
				<ul>
					{data?.data.map(post => (
						<li key={post.id}>{post.title}</li>
					))}
				</ul>
			</PageContent>
		</>
	)
}
