'use client'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldControl } from './FieldControl'
import { PasswordInput } from './PasswordInput'
import { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export function FormField({
  name,
  label,
  type,
  disabled,
  ...props
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
            label={label}
            type={type}
            {...props}
          />
        )
      }
    />
  )
}
