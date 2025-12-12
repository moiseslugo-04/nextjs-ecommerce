export interface GoogleAccountPayload {
  userId: string
  provider: string
  type: string
  providerAccountId: string
  access_token?: string | null
  refresh_token?: string | null
  scope?: string | null
  token_type?: string | null
  id_token?: string | null
  expires_at?: number | null
}
