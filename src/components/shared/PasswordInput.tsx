import { useState } from 'react'
import { type FieldControlProps } from '../FieldControl'
import { FieldValues } from 'react-hook-form'
import { Field, FieldLabel, FieldError } from '@components/ui/field'
import { Input } from '@components/ui/input'
import { EyeOff, Eye } from 'lucide-react'
export function PasswordInput<T extends FieldValues>({
  label,
  placeholder,
  field,
  fieldState,
}: FieldControlProps<T>) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <Field aria-invalid={fieldState.invalid}>
      <FieldLabel className='flex flex-col gap-2 items-start relative'>
        <span className='block text-gray-700 font-medium mb-2 text-start '>
          {label}
        </span>
        <Input
          {...field}
          type={showPassword ? 'text' : 'password'}
          className='input-field'
          placeholder={placeholder ?? '***********'}
          required
        />
        <button
          type='button'
          className='absolute right-3 top-13 transform -translate-y-1/2 text-gray-500 cursor-pointer'
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </FieldLabel>

      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}
