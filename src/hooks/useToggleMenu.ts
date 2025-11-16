import { useState } from 'react'

export function useToggleMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return { isOpen, toggle }
}
