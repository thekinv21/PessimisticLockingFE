'use client'

import type { TPost } from '@/entities/post'

import type { TPostDetailPageModel } from '../model/usePostDetailPage'
import { DeletePostDialog } from './DeletePostDialog'
import { InlineAlert } from './InlineAlert'
import { PostActions } from './PostActions'
import { PostByline } from './PostByline'
import { PostEditForm } from './PostEditForm'
import { PostLockBanner } from './PostLockBanner'
import { PostView } from './PostView'

type TPostDetailContentProps = {
	post: TPost
	page: TPostDetailPageModel
}

export function PostDetailContent({ post, page }: TPostDetailContentProps) {
	const { detail, lock, editing, deletion } = page

	return (
		<>
			{lock.lockedBy && <PostLockBanner holderName={lock.lockedBy} />}
			{editing.isEditing ? (
				<PostEditForm editing={editing} />
			) : (
				<PostView
					post={post}
					editedText={detail.editedText}
					actions={
						<PostActions
							isLocked={!!lock.lockedBy}
							isStarting={editing.isStarting}
							onEdit={editing.start}
							onDelete={deletion.open}
						/>
					}
				/>
			)}
			{editing.startError && (
				<div className='mt-6'>
					<InlineAlert>{editing.startError}</InlineAlert>
				</div>
			)}
			{detail.byline && <PostByline byline={detail.byline} />}
			<DeletePostDialog postTitle={post.title} deletion={deletion} />
		</>
	)
}
