'use client'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldControl } from './FieldControl'
import { PasswordInput } from './PasswordInput'
interface FormFieldProps {
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
  type?: 'text' | 'password' | 'email' | 'number' | 'file'
  className?: string
}

export function FormField({
  name,
  label,
  placeholder,
  disabled,
  type,
  className,
}: FormFieldProps) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        type === 'password' ? (
          <PasswordInput label={label} field={field} fieldState={fieldState} />
        ) : (
          <FieldControl
            field={{ ...field, disabled }}
            fieldState={fieldState}
            placeholder={placeholder}
            label={label}
            type={type}
            className={className}
          />
        )
      }
    />
  )
}
