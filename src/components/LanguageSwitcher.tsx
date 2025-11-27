'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguageStore } from '../stores/languageStore'
import { LanguagesIcon } from 'lucide-react'

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'pt', label: 'Portuguese', flag: '🇧🇷' },
]

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguageStore()
  const current = languages.find((l) => l.code === language)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  return (
    <div className='relative inline-block text-left' ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center gap-2 px-4 py-2 text-white text-sm rounded-lg shadow  cursor-pointer'
      >
        <span>{current?.flag}</span>
        <LanguagesIcon className='w-4 h-4' />
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-44 rounded-md bg-white shadow-lg ring-1 ring-black/10 z-10 overflow-hidden'>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as 'en' | 'es' | 'pt')
                setOpen(false)
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-blue-500 hover:text-white text-zinc-800 transition`}
            >
              <span>{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
