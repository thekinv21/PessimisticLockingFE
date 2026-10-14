'use client'

import { useDeletePost } from './useDeletePost'
import { useLockSocket } from './useLockSocket'
import { usePostDetail } from './usePostDetail'
import { usePostEditing } from './usePostEditing'
import { usePostLock } from './usePostLock'

export function usePostDetailPage(id: number) {
	const detail = usePostDetail(id)

	const socket = useLockSocket()

	const lock = usePostLock(id, socket)

	const editing = usePostEditing(detail.post, lock)

	const deletion = useDeletePost(id)

	return { detail, lock, editing, deletion }
}

export type TPostDetailPageModel = ReturnType<typeof usePostDetailPage>
