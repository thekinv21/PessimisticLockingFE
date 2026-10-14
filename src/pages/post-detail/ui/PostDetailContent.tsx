'use client'

import type { TPost } from '@/entities/post'

import type { TPostDetailPageModel } from '../model/usePostDetailPage'
import { DeletePostDialog } from './DeletePostDialog'
import { InlineAlert } from './InlineAlert'
import { PostActions } from './PostActions'
import { PostByline } from './PostByline'
import { PostEditForm } from './PostEditForm'
import { PostLockOverlay } from './PostLockOverlay'
import { PostView } from './PostView'

type TPostDetailContentProps = {
	post: TPost
	page: TPostDetailPageModel
}

export function PostDetailContent({ post, page }: TPostDetailContentProps) {
	const { detail, lock, editing, deletion } = page

	const isLocked: boolean = !!lock.lockedBy

	return (
		<>
			<div inert={isLocked}>
				{editing.isEditing ? (
					<PostEditForm editing={editing} />
				) : (
					<PostView
						post={post}
						editedText={detail.editedText}
						actions={
							<PostActions
								isLocked={isLocked}
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
			</div>
			{lock.lockedBy && (
				<PostLockOverlay
					holderName={lock.lockedBy}
					holderInitials={lock.lockedByInitials ?? ''}
				/>
			)}
			<DeletePostDialog postTitle={post.title} deletion={deletion} />
		</>
	)
}
