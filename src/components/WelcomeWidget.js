/**
 * Welcome Widget Component
 * Shows a welcome message in bottom right corner with close button
 */

export class WelcomeWidget {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.show();
  }

  render() {
    this.container = document.createElement('div');
    this.container.className = 'welcome-widget';
    this.container.innerHTML = `
      <div class="welcome-widget__content">
        <span class="welcome-widget__text">Welcome!</span>
        <button class="welcome-widget__close" aria-label="Close welcome message">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(this.container);
  }

  attachEventListeners() {
    const closeBtn = this.container.querySelector('.welcome-widget__close');
    closeBtn.addEventListener('click', () => this.close());
  }

  show() {
    setTimeout(() => {
      this.container.classList.add('welcome-widget--visible');
    }, 500);
  }

  close() {
    this.container.classList.remove('welcome-widget--visible');
    setTimeout(() => {
      this.container.remove();
    }, 300);
  }
}
