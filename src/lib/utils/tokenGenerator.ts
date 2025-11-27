import crypto from 'crypto'

export function generatorRandomToken(size: number) {
  return crypto.randomBytes(size).toString('hex')
}
