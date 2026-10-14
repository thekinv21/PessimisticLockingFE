import { Suspense } from 'react'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PostDetailPage } from '@/pages/post-detail'

export const metadata: Metadata = {
	title: 'Post',
}

type TPageProps = { params: Promise<{ id: string }> }

type TPostDetailProps = TPageProps

async function PostDetail({ params }: TPostDetailProps) {
	const id = Number((await params).id)

	if (!Number.isInteger(id) || id <= 0) notFound()

	return <PostDetailPage id={id} />
}

export default function Page({ params }: TPageProps) {
	return (
		<Suspense>
			<PostDetail params={params} />
		</Suspense>
	)
}
