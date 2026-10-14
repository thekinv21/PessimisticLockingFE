'use client'

import { Button } from '@/shared/ui'

import type { TDeletePost } from '../model/useDeletePost'
import { useModalDialog } from '../model/useModalDialog'

type TDeletePostDialogProps = { postTitle: string; deletion: TDeletePost }

export function DeletePostDialog({
	postTitle,
	deletion,
}: TDeletePostDialogProps) {
	const dialogRef = useModalDialog(deletion.isOpen)

	return (
		<dialog
			ref={dialogRef}
			onClose={deletion.close}
			aria-labelledby='delete-post-title'
			className='m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line bg-surface p-6 text-ink shadow-float backdrop:bg-ink/30 open:animate-pop'
		>
			<h2
				id='delete-post-title'
				className='font-display text-xl leading-7 font-extrabold tracking-tight'
			>
				Delete this post?
			</h2>
			<p className='mt-2 leading-6 text-ink-muted'>
				“{postTitle}” will be removed for everyone. This can’t be undone.
			</p>
			{deletion.errorMessage && (
				<p
					role='alert'
					className='mt-4 animate-shake rounded-xl bg-danger-soft px-4 py-3 text-danger-strong'
				>
					{deletion.errorMessage}
				</p>
			)}
			<div className='mt-6 flex justify-end gap-2.5'>
				<Button
					variant='secondary'
					size='sm'
					onClick={deletion.close}
					autoFocus
				>
					Cancel
				</Button>
				<Button
					variant='danger'
					size='sm'
					pending={deletion.isPending}
					onClick={deletion.confirm}
				>
					Delete post
				</Button>
			</div>
		</dialog>
	)
}
