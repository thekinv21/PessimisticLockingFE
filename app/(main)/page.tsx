import type { Metadata } from 'next'

import { PostsPage } from '@/pages/posts'

export const metadata: Metadata = {
	title: 'Posts',
}

export default function Page() {
	return <PostsPage />
}
