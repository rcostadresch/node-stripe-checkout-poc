import { sign } from 'jsonwebtoken'

interface GenerateJwtTokenProps {
  serializerData?: { [key: string]: any }
  subject?: string
}

export function generateJwtToken({ serializerData, subject }: GenerateJwtTokenProps): string {
  return sign(serializerData, process.env.JWT_PRIVATE_KEY, {
    subject,
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}
