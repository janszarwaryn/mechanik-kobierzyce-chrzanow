import { reactive, ref } from 'vue'
import { validateContactForm } from '~/utils/validation'
import type { ContactFields, ContactErrors } from '~/utils/validation'

export type ContactStatus = 'idle' | 'submitting' | 'error' | 'success'

/**
 * Contact-form state machine: idle -> submitting -> success | error.
 * Submission delivery is a documented seam (see `deliverContact`); the default
 * implementation is a stub. Swap for Formspree / a Nuxt server route later.
 */
export function useContactForm() {
  const fields = reactive<ContactFields>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const errors = ref<ContactErrors>({})
  const status = ref<ContactStatus>('idle')

  async function submit(): Promise<boolean> {
    errors.value = validateContactForm(fields)
    if (Object.keys(errors.value).length > 0) {
      status.value = 'error'
      return false
    }
    status.value = 'submitting'
    try {
      await deliverContact({ ...fields })
      status.value = 'success'
      return true
    } catch {
      status.value = 'error'
      return false
    }
  }

  function reset() {
    fields.name = ''
    fields.email = ''
    fields.phone = ''
    fields.message = ''
    errors.value = {}
    status.value = 'idle'
  }

  return { fields, errors, status, submit, reset }
}

// Delivery seam. Stub resolves so the UI reaches the success state; replace
// with a real endpoint when the mail provider is chosen.
async function deliverContact(_payload: ContactFields): Promise<void> {
  return Promise.resolve()
}
