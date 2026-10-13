'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'

const isApplePlatform = () => /Mac|iPhone|iPad/.test(navigator.userAgent)
const noSubscription = () => () => {}

export function useSearchShortcut() {
	const inputRef = useRef<HTMLInputElement>(null)
	const isApple = useSyncExternalStore(
		noSubscription,
		isApplePlatform,
		() => false,
	)

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() !== 'k') return
			if (!(event.metaKey || event.ctrlKey)) return
			event.preventDefault()
			inputRef.current?.focus()
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [])

	return { inputRef, shortcutLabel: isApple ? '⌘K' : 'Ctrl K' }
}
