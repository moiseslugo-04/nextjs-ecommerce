import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form'
import { Field, FieldLabel, FieldError } from '../ui/field'
import { Input } from '../ui/input'
import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/ui/utils'

export type FieldControlProps<T extends FieldValues> = {
  label?: string
  type?: string
  field: ControllerRenderProps<T, Path<T>>
  fieldState: ControllerFieldState
} & InputHTMLAttributes<HTMLInputElement>
export function FieldControl<T extends FieldValues>({
  label,
  field,
  fieldState,
  type,
  className,
  ...props
}: FieldControlProps<T>) {
  const isFile = type === 'file'
  return (
    <Field aria-invalid={fieldState.invalid}>
      <FieldLabel className={cn('flex flex-col gap-2 items-start', className)}>
        <span className='block text-gray-700 font-medium mb-2 text-start '>
          {label}
        </span>
        <Input
          {...(isFile
            ? {
                onChange: (e) => field.onChange(e.currentTarget.files),
                ref: field.ref,
                name: field.name,
                type: 'file',
              }
            : field)}
          type={type}
          className='input-field'
          {...props}
        />
      </FieldLabel>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}
