import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'en' | 'es' | 'pt'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
}
export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'pt',
      setLanguage: (lang) => {
        set({ language: lang })
      },
    }),
    {
      name: 'language-storage',
    }
  )
)
