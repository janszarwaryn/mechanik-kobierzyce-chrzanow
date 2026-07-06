import { describe, it, expect } from 'vitest'
import { validateContactForm } from '../../app/utils/validation'

const valid = {
  name: 'Jan Kowalski',
  email: 'jan@example.com',
  phone: '+48 601 996 692',
  message: 'Dzień dobry, proszę o wycenę blokady parkingowej typu U.',
}

describe('validateContactForm', () => {
  it('returns no errors for a fully valid form', () => {
    expect(validateContactForm(valid)).toEqual({})
  })

  it('flags a missing or too-short name', () => {
    expect(validateContactForm({ ...valid, name: '' }).name).toBe('errName')
    expect(validateContactForm({ ...valid, name: 'J' }).name).toBe('errName')
  })

  it('flags an invalid email', () => {
    expect(validateContactForm({ ...valid, email: 'nope' }).email).toBe('errEmail')
    expect(validateContactForm({ ...valid, email: '' }).email).toBe('errEmail')
    expect(validateContactForm({ ...valid, email: 'a@b.co' }).email).toBeUndefined()
  })

  it('accepts an empty phone but rejects a malformed one', () => {
    expect(validateContactForm({ ...valid, phone: '' }).phone).toBeUndefined()
    expect(validateContactForm({ ...valid, phone: 'abc' }).phone).toBe('errPhone')
    expect(validateContactForm({ ...valid, phone: '123' }).phone).toBe('errPhone')
    expect(validateContactForm({ ...valid, phone: '601996692' }).phone).toBeUndefined()
  })

  it('flags a too-short message', () => {
    expect(validateContactForm({ ...valid, message: 'hi' }).message).toBe('errMessage')
  })

  it('is a pure function (does not mutate input)', () => {
    const input = { ...valid, name: '' }
    const snapshot = JSON.stringify(input)
    validateContactForm(input)
    expect(JSON.stringify(input)).toBe(snapshot)
  })
})
