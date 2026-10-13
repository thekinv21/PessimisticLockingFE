import { Bell } from 'lucide-react'

import { IconButton } from '@/shared/ui'

export function NotificationsButton() {
	return (
		<IconButton aria-label='Notifications'>
			<Bell className='size-4.5' aria-hidden />
		</IconButton>
	)
}
