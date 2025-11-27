import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form'
import { Field, FieldLabel, FieldError } from './ui/field'
import { Input } from './ui/input'

export type FieldControlProps<T extends FieldValues> = {
  label?: string
  placeholder?: string
  type?: string
  required?: boolean
  field: ControllerRenderProps<T, Path<T>>
  fieldState: ControllerFieldState
}
export function FieldControl<T extends FieldValues>({
  label,
  placeholder,
  type = 'text',
  field,
  fieldState,
  required = false,
}: FieldControlProps<T>) {
  return (
    <Field aria-invalid={fieldState.invalid}>
      <FieldLabel className='flex flex-col gap-2 items-start'>
        <span className='block text-gray-700 font-medium mb-2 text-start '>
          {label}
        </span>
        <Input
          {...field}
          type={type}
          className='input-field'
          placeholder={placeholder}
          required={required}
        />
      </FieldLabel>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}
