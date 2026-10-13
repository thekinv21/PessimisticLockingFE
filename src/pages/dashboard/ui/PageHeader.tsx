'use client'

type TPageHeaderProps = {
	title: string
}

export function PageHeader({ title }: TPageHeaderProps) {
	return (
		<header className='flex shrink-0 animate-fade items-center gap-3 px-6 pt-6 pb-4 max-mobile:flex-wrap max-mobile:px-4 max-mobile:pt-4'>
			<h1 className='min-w-0 flex-auto truncate font-display text-[26px] leading-8 font-extrabold tracking-tight text-ink'>
				{title}
			</h1>
		</header>
	)
}
