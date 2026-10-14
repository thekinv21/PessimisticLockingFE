import { FileText } from 'lucide-react'

export function PostListEmpty() {
	return (
		<div className='flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line-strong px-6 py-14 text-center'>
			<span className='grid size-12 place-items-center rounded-xl bg-raised text-ink-subtle'>
				<FileText className='size-5' aria-hidden />
			</span>
			<p className='text-ink-muted'>There are no posts yet.</p>
		</div>
	)
}
