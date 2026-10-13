'use client'

import { usePostListQuery } from '@/entities/post'

export function DashboardPage() {
	const { data, isPending, isError } = usePostListQuery({
		offset: 0,
		limit: 10,
	})

	return (
		<div className='flex flex-col gap-2 p-6'>
			<ul>
				{data?.data.map(post => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	)
}
