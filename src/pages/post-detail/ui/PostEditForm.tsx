'use client'

import { LockKeyhole } from 'lucide-react'

import { Button, TextField } from '@/shared/ui'

import type { TPostEditing } from '../model/usePostEditing'
import { DescriptionField } from './DescriptionField'
import { InlineAlert } from './InlineAlert'

type TPostEditFormProps = { editing: TPostEditing }

export function PostEditForm({ editing }: TPostEditFormProps) {
	const { register, errors } = editing

	return (
		<form
			noValidate
			onSubmit={editing.submit}
			className='mt-6 flex flex-col gap-6'
		>
			<p className='flex items-center gap-2.5 rounded-xl bg-brand-soft px-4 py-3 text-[14px] text-brand-strong'>
				<LockKeyhole className='size-4 shrink-0' aria-hidden />
				You’re editing this post. Nobody else can change it until you save or
				cancel.
			</p>
			{editing.errorMessage && (
				<InlineAlert>{editing.errorMessage}</InlineAlert>
			)}
			<TextField
				label='Title'
				autoFocus
				error={errors.title?.message}
				{...register('title')}
			/>
			<DescriptionField
				error={errors.description?.message}
				{...register('description')}
			/>
			<div className='flex justify-end gap-2.5 border-t border-line pt-5'>
				<Button
					type='button'
					variant='secondary'
					size='sm'
					onClick={editing.cancel}
				>
					Cancel
				</Button>
				<Button
					type='submit'
					size='sm'
					pending={editing.isSaving}
					disabled={!editing.canSave}
				>
					Save changes
				</Button>
			</div>
		</form>
	)
}
