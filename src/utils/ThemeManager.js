/**
 * ThemeManager Utility
 * Handles theme switching (light/dark) and persistence
 */

export class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    // Check for system preference if no saved theme
    if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.theme = 'dark';
    }
    
    this.applyTheme();
    
    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        this.theme = e.matches ? 'dark' : 'light';
        this.applyTheme();
      }
    });
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
    return this.theme;
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    document.body.setAttribute('data-theme', this.theme);
    
    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', this.theme === 'dark' ? '#020617' : '#FFFFFF');
    }
    
    // Dispatch custom event for other components to react
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme: this.theme } }));
  }

  getTheme() {
    return this.theme;
  }
}
