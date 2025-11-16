import React, { useState } from 'react'
import { InitialLoginErrors, InitialLoginState } from '../utils/constants'
import type { LoginErrorsProps } from '../types'

export function useLogin() {
  const [formData, setFormData] = useState(InitialLoginState)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<LoginErrorsProps>(InitialLoginErrors)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrors(InitialLoginErrors)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    console.log(name, value)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    setFormData((data) => ({ ...data, [name]: value }))
    setErrors((errors) => ({ ...errors, [name]: null }))
  }
  const handleShowPassword = () => setShowPassword(!showPassword)
  return {
    formData,
    errors,
    isLoading: false,
    showPassword,
    onChange,
    handleSubmit,
    handleShowPassword,
    handleBlur,
  }
}
