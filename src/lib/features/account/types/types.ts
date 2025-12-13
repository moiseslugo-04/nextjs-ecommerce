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

export type OrderItemType = {
  id: string
  orderNumber: string
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  currency: string
  createdAt: string
}

export type CreditCardType = {
  id: string
  brand: string
  last4: string
  holderName: string
  expMonth: number
  expYear: number
  isDefault: boolean
}
