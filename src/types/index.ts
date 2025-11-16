export interface User {
  id: string
  name: string
  identifier: string
}
export type LoginErrorsProps = {
  identifier: string | null
  password: string | null
  login: string | null
}
export type LinkType = { href: string; label: string }
