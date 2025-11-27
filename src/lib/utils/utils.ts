import bcrypt from 'bcryptjs'
import crypto from 'crypto'

export async function hashText(text: string, salt = 10) {
  return bcrypt.hash(text, salt)
}
export async function compareHashText(text: string, hash: string) {
  return bcrypt.compare(text, hash)
}

export function generatorRandomToken(size: number) {
  return crypto.randomBytes(size).toString('hex')
}
