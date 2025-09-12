import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'

// --- Type shims so the IDE stops warning ---
declare global {
  interface Window {
    Alpine: typeof Alpine
  }
}

type ThemeStore = {
  isDark: boolean
  init(): void
  toggle(): void
}

// Register plugin (no official TS types for @alpinejs/collapse)
Alpine.plugin(collapse as any)

// Central theme store
;(Alpine as any).store('theme', {
  init() {
    this.isDark = (() => {
      if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme') === 'dark'
      }
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return true
      }
      return false
    })()
  },
  isDark: false,
  toggle() {
    this.isDark = !this.isDark
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    }
  },
} as ThemeStore)

// Expose Alpine and start
window.Alpine = Alpine
Alpine.start()