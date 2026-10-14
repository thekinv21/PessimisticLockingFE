import type { TPostGroup } from '../model/usePostGroups'
import { PostRow } from './PostRow'

type TPostGroupProps = { group: TPostGroup }

export function PostGroup({ group }: TPostGroupProps) {
	return (
		<section aria-label={group.label}>
			<h2 className='mb-2 flex items-center gap-2 px-1 font-display text-sm font-bold text-ink-muted'>
				{group.label}
				<span className='text-ink-subtle'>{group.items.length}</span>
			</h2>
			<ul className='divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-clay-sm'>
				{group.items.map(row => (
					<PostRow key={row.id} row={row} />
				))}
			</ul>
		</section>
	)
}
