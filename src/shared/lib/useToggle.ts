'use client'

import { useCallback, useState } from 'react'

export function useToggle(initial = false) {
	const [isOn, setIsOn] = useState<boolean>(initial)
	const toggle = useCallback(() => setIsOn(value => !value), [])

	return [isOn, toggle] as const
}
