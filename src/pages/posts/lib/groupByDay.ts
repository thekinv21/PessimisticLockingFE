const DAY_MS = 86_400_000

const GROUPS = [
	{ label: 'Today', maxDaysAgo: 0 },
	{ label: 'Yesterday', maxDaysAgo: 1 },
	{ label: 'This week', maxDaysAgo: 6 },
	{ label: 'Earlier', maxDaysAgo: Infinity },
]

const startOfDay = (date: Date) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

export function groupByDay<T>(items: T[], getDate: (item: T) => string) {
	if (items.length === 0) return []

	const today = startOfDay(new Date())

	const daysAgo = (item: T) =>
		Math.round((today - startOfDay(new Date(getDate(item)))) / DAY_MS)

	return GROUPS.map((group, index) => {
		const minDaysAgo =
			index === 0 ? -Infinity : GROUPS[index - 1].maxDaysAgo + 1

		return {
			label: group.label,
			items: items.filter(item => {
				const days = daysAgo(item)
				return days >= minDaysAgo && days <= group.maxDaysAgo
			}),
		}
	}).filter(group => group.items.length > 0)
}
