import {
  findByProvider,
  saveAccount,
  updateTokens,
} from '@features/auth/repositories/account.repository'
import { Account } from '@prisma/client'

export async function linkOrUpdateAccount(
  userId: string,
  account: Omit<Account, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
) {
  const existingAccount = await findByProvider(
    account.provider,
    account.providerAccountId
  )
  console.log(existingAccount, 'login')
  if (!existingAccount) {
    console.log('🌱 Link new OAuth account to user', userId)
    saveAccount({ userId, ...account })
    return 'LINKED'
  }
  console.log('🔄 Updating OAuth tokens...')
  updateTokens(account.provider, account.providerAccountId, { ...account })
  return 'UPDATED'
}
