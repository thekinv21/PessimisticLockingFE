import { APP_NAME } from '@/shared/config'
import { LogoMark } from '@/shared/ui'

export function SidebarBrand() {
	return (
		<div className='flex items-center gap-2.5 border-b border-line px-1 pt-0.5 pb-3 max-laptop:justify-center max-laptop:px-0 max-mobile:border-0 max-mobile:p-0'>
			<LogoMark className='size-9 shrink-0' />
			<span className='min-w-0 grow truncate font-display text-lg leading-5.5 font-extrabold tracking-[-0.01em] max-laptop:hidden'>
				{APP_NAME}
			</span>
		</div>
	)
}
