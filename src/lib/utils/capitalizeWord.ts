export function capitalizeWord(word: string) {
  if (!word) return ''
  const s = String(word)
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}
