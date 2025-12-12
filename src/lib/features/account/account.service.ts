import { saveAccount, getAccountByUserId } from './account.repository'
import { GoogleAccountPayload } from './types/types'

type AccountPayload = {
  account: GoogleAccountPayload
  userId: string
}
export async function connectGoogleAccount({
  account,
  userId,
}: AccountPayload) {
  const existingAccount = await getAccountByUserId(userId)
  if (!existingAccount) {
    await saveAccount(account)
  }
}
