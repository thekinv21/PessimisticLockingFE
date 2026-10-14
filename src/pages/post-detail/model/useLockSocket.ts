'use client'

import { useEffect, useState } from 'react'

import { createLockSocket } from '../api/lockSocket'

export function useLockSocket() {
	const [socket] = useState(createLockSocket)

	useEffect(() => {
		socket.connect()

		return () => {
			socket.disconnect()
		}
	}, [socket])

	return socket
}
