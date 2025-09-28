import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

const updateThemeMeta = (isDark: boolean) => {
  const root = document.documentElement;
  const lightColor = root.dataset.themeLight;
  const darkColor = root.dataset.themeDark || lightColor;
  const meta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (!meta || !lightColor) return;
  meta.setAttribute('content', isDark ? (darkColor ?? lightColor) : lightColor);
};

let initialized = false;

export default function initAlpine() {
  if (initialized) return;
  initialized = true;

  Alpine.plugin(collapse);

  Alpine.store('theme', {
    isDark: false,
    init() {
      this.isDark = (() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
          return localStorage.getItem('theme') === 'dark';
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return true;
        }
        return false;
      })();
      updateThemeMeta(this.isDark);
    },
    toggle() {
      this.isDark = !this.isDark;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
      }
      updateThemeMeta(this.isDark);
    },
  });

  window.Alpine = Alpine;
  Alpine.start();
}
