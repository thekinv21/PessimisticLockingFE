import type { SVGProps } from 'react'

type TLogoMarkProps = SVGProps<SVGSVGElement>

// A record held by a lock, with a second record waiting behind it.
export function LogoMark(props: TLogoMarkProps) {
	return (
		<svg viewBox='0 0 40 40' fill='none' aria-hidden {...props}>
			<rect
				x='14'
				y='7'
				width='20'
				height='25'
				rx='5'
				className='fill-brand/30'
			/>
			<rect
				x='6'
				y='13'
				width='23'
				height='24'
				rx='5.5'
				className='fill-brand'
			/>
			<path
				d='M11.5 14.5V10a6 6 0 0 1 12 0v4.5'
				strokeWidth='3.2'
				strokeLinecap='round'
				className='stroke-caries'
			/>
			<circle cx='17.5' cy='23.5' r='2.8' className='fill-on-brand' />
			<rect
				x='16.25'
				y='24.5'
				width='2.5'
				height='6.5'
				rx='1.25'
				className='fill-on-brand'
			/>
		</svg>
	)
}
