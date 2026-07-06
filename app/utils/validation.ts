export interface ContactFields {
  name: string
  email: string
  phone: string
  message: string
}

/** Error values are i18n keys under `contact.form.` (e.g. "errEmail"). */
export type ContactErrors = Partial<Record<keyof ContactFields, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// 9+ digits after stripping spaces, hyphens, parentheses and a leading +.
const PHONE_RE = /^\+?[0-9]{9,15}$/

export function validateContactForm(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {}

  if (fields.name.trim().length < 2) errors.name = 'errName'

  if (!EMAIL_RE.test(fields.email.trim())) errors.email = 'errEmail'

  const phone = fields.phone.replace(/[\s\-()]/g, '')
  if (phone.length > 0 && !PHONE_RE.test(phone)) errors.phone = 'errPhone'

  if (fields.message.trim().length < 10) errors.message = 'errMessage'

  return errors
}
