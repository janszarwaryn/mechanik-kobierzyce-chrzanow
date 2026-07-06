import { useState } from '#imports'

export type Theme = 'light' | 'dark'

/** Manual light/dark toggle, persisted to localStorage, applied via
 *  `data-theme` on <html> (matches the `@custom-variant dark` in main.css). */
export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')

  function apply(t: Theme) {
    theme.value = t
    if (import.meta.client) {
      document.documentElement.dataset.theme = t
      try {
        localStorage.setItem('theme', t)
      } catch {
        /* ignore storage errors (private mode) */
      }
    }
  }

  function init() {
    if (!import.meta.client) return
    const stored = (localStorage.getItem('theme') as Theme | null) ?? null
    const sys = matchMedia('(prefers-color-scheme: dark)').matches
    apply(stored ?? (sys ? 'dark' : 'light'))
  }

  function toggle() {
    apply(theme.value === 'dark' ? 'light' : 'dark')
  }

  return { theme, init, toggle }
}
