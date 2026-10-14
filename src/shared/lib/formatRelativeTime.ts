const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
	['year', 31_536_000],
	['month', 2_592_000],
	['week', 604_800],
	['day', 86_400],
	['hour', 3_600],
	['minute', 60],
]

const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export function formatRelativeTime(value: string) {
	const seconds = (Date.parse(value) - Date.now()) / 1000

	for (const [unit, unitSeconds] of UNITS) {
		if (Math.abs(seconds) >= unitSeconds) {
			return formatter.format(Math.round(seconds / unitSeconds), unit)
		}
	}

	return 'just now'
}
