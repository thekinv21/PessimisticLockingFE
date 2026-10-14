import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/shared/ui'

type TPostActionsProps = {
	isLocked: boolean
	isStarting: boolean
	onEdit: () => void
	onDelete: () => void
}

export function PostActions(props: TPostActionsProps) {
	const { isLocked, isStarting, onEdit, onDelete } = props

	return (
		<div className='flex shrink-0 gap-2.5'>
			<Button
				variant='secondary'
				size='sm'
				onClick={onDelete}
				disabled={isLocked}
			>
				<Trash2 className='size-4' aria-hidden />
				Delete
			</Button>
			<Button
				size='sm'
				onClick={onEdit}
				pending={isStarting}
				disabled={isLocked}
			>
				{!isStarting && <Pencil className='size-4' aria-hidden />}
				Edit
			</Button>
		</div>
	)
}
