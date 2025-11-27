import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function capitalizeWord(word: string) {
  if (!word) return ''
  const s = String(word)
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}
