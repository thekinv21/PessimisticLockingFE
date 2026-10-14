import { type TextareaHTMLAttributes, useId } from 'react'

type TDescriptionFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	error?: string
}

export function DescriptionField({ error, ...rest }: TDescriptionFieldProps) {
	const id = useId()

	const errorId = `${id}-error`

	return (
		<div className='flex flex-col gap-2'>
			<label htmlFor={id} className='font-medium text-ink'>
				Description
			</label>
			<textarea
				{...rest}
				id={id}
				rows={8}
				aria-invalid={Boolean(error)}
				aria-describedby={error ? errorId : undefined}
				className='min-h-48 w-full resize-y rounded-xl border border-line bg-raised px-4 py-3 text-[16px] leading-7 text-ink shadow-press transition-colors outline-none focus:border-brand focus:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-invalid:border-danger'
			/>
			{error && (
				<p id={errorId} className='text-[13px] leading-5 text-danger'>
					{error}
				</p>
			)}
		</div>
	)
}
