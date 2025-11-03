import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

/**
 * Update the `theme-color` meta tag to keep OS chrome in sync.
 * @param {boolean} isDark
 */
const updateThemeMeta = (isDark) => {
  const root = document.documentElement;
  const lightColor = root.dataset.themeLight;
  const darkColor = root.dataset.themeDark || lightColor;
  const meta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (!meta || !lightColor) return;
  meta.setAttribute('content', isDark ? (darkColor ?? lightColor) : lightColor);
};

let initialized = false;

/**
 * @typedef {Object} LightboxStoreItem
 * @property {string} id
 * @property {HTMLElement} el
 * @property {() => void} open
 * @property {() => void} close
 */

/**
 * @typedef {Object} LightboxStore
 * @property {LightboxStoreItem[]} items
 * @property {string | null} currentId
 * @property {(item: LightboxStoreItem) => void} register
 * @property {(id: string) => void} [unregister]
 * @property {(id: string) => void} setCurrent
 * @property {(id?: string) => void} clearCurrent
 * @property {() => void} closeAll
 * @property {() => void} reset
 * @property {(id: string) => void} close
 * @property {() => LightboxStoreItem[]} getOrderedItems
 * @property {(currentId: string) => void} next
 * @property {(currentId: string) => void} prev
 */

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

  /**
   * @param {Element | null} el
   * @returns {number}
   */
  const computePosition = (el) => {
    if (!el || !(el instanceof HTMLElement)) return Number.MAX_SAFE_INTEGER;
    const rect = el.getBoundingClientRect();
    return rect.top * 10000 + rect.left;
  };

  /** @type {LightboxStore} */
  const lightboxStore = {
    items: [],
    currentId: null,
    register(item) {
      if (!item || !item.id || !item.el) return;
      if (this.items.some((existing) => existing.id === item.id)) return;
      this.items.push(item);
    },
    unregister(id) {
      if (!id) return;
      this.items = this.items.filter((item) => item.id !== id);
      if (this.currentId === id) {
        this.currentId = null;
      }
    },
    setCurrent(id) {
      this.currentId = id;
    },
    clearCurrent(id) {
      if (!id || this.currentId === id) {
        this.currentId = null;
      }
    },
    closeAll() {
      this.items.forEach((item) => item?.close?.());
      this.currentId = null;
    },
    reset() {
      this.closeAll();
      this.items = [];
    },
    close(id) {
      const target = this.items.find((item) => item.id === id);
      target?.close?.();
      if (this.currentId === id) {
        this.currentId = null;
      }
    },
    getOrderedItems() {
      return this.items
        .filter((item) => item?.el?.isConnected)
        .slice()
        .sort((a, b) => computePosition(a.el) - computePosition(b.el));
    },
    next(currentId) {
      const ordered = this.getOrderedItems();
      if (!ordered.length) return;
      const currentIndex = ordered.findIndex((item) => item.id === currentId);
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % ordered.length : 0;
      const target = ordered[nextIndex];
      target?.open?.();
      if (currentIndex >= 0) {
        ordered[currentIndex]?.close?.(false);
      }
      this.currentId = target?.id ?? null;
    },
    prev(currentId) {
      const ordered = this.getOrderedItems();
      if (!ordered.length) return;
      const currentIndex = ordered.findIndex((item) => item.id === currentId);
      const prevIndex =
        currentIndex >= 0 ? (currentIndex - 1 + ordered.length) % ordered.length : ordered.length - 1;
      const target = ordered[prevIndex];
      target?.open?.();
      if (currentIndex >= 0) {
        ordered[currentIndex]?.close?.(false);
      }
      this.currentId = target?.id ?? null;
    },
  };

  Alpine.store('lightboxGallery', lightboxStore);

  Alpine.data('imageLightbox', function (...initialState) {
    /** @type {{ id?: string; disabled?: boolean }} */
    const [state = {}] = initialState;
    const id = typeof state.id === 'string' ? state.id : String(state.id ?? '');
    const disabled = Boolean(state.disabled);

    return {
      id,
      disabled,
      open: false,
      imageTransitioning: false,
      /** @type {'next' | 'prev' | null} */
      pendingDirection: null,
      register() {
        if (this.disabled) return;
        this.closeLightbox(false);
        this.$nextTick(() => {
          /** @type {LightboxStore | undefined} */
          const storeInstance = Alpine.store('lightboxGallery');
          if (!storeInstance) return;
          /** @type {HTMLElement | undefined} */
          const element = this.$el;
          if (!element) return;
          storeInstance.register({
            id: this.id,
            el: element,
            open: () => {
              this.openLightbox({ fromStore: true });
            },
            close: () => {
              this.closeLightbox(false);
            },
          });
        });
      },
      destroy() {
        if (this.disabled) return;
        /** @type {LightboxStore | undefined} */
        const store = Alpine.store('lightboxGallery');
        store?.unregister?.(this.id);
        store?.clearCurrent?.(this.id);
        this.closeLightbox(false);
      },
      /**
       * @param {{ fromStore?: boolean }} [options]
       */
      openLightbox(options = {}) {
        if (this.disabled) return;
        const fromStore = options.fromStore === true;
        /** @type {LightboxStore | undefined} */
        const store = Alpine.store('lightboxGallery');
        if (!fromStore && store?.currentId && store.currentId !== this.id) {
          store.close(store.currentId);
        }
        this.open = true;
        this.imageTransitioning = false;
        this.$nextTick(() => {
          /** @type {HTMLElement | undefined} */
          const content = this.$refs.lightboxContent;
          if (content?.scrollTo) {
            content.scrollTo(0, 0);
          } else if (content) {
            content.scrollTop = 0;
          }
        });
        store?.setCurrent(this.id);
      },
      closeLightbox(updateStore = true) {
        this.open = false;
        this.imageTransitioning = false;
        if (updateStore) {
          /** @type {LightboxStore | undefined} */
          const store = Alpine.store('lightboxGallery');
          store?.clearCurrent(this.id);
        }
      },
      /**
       * @param {'next' | 'prev'} direction
       */
      performNavigation(direction) {
        /** @type {LightboxStore | undefined} */
        const store = Alpine.store('lightboxGallery');
        if (direction === 'next') {
          store?.next(this.id);
        } else {
          store?.prev(this.id);
        }
      },
      /**
       * @param {'next' | 'prev'} direction
       */
      startFadeAndNavigate(direction) {
        if (!this.open) {
          this.performNavigation(direction);
          return;
        }
        this.pendingDirection = direction;
        this.performNavigation(direction);
      },
      navigateNext() {
        this.startFadeAndNavigate('next');
      },
      navigatePrev() {
        this.startFadeAndNavigate('prev');
      },
    };
  });

  const resetLightboxStore = () => {
    /** @type {LightboxStore | undefined} */
    const store = Alpine.store('lightboxGallery');
    store?.reset?.();
  };

  const closeAllLightboxes = () => {
    /** @type {LightboxStore | undefined} */
    const store = Alpine.store('lightboxGallery');
    store?.closeAll?.();
  };

  document.addEventListener('astro:before-swap', () => {
    closeAllLightboxes();
    resetLightboxStore();
  });

  document.addEventListener('astro:after-swap', () => {
    resetLightboxStore();
  });

  window.Alpine = Alpine;
  Alpine.start();
}
