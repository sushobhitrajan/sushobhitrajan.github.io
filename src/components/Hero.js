/**
 * Hero Section Component
 * Landing section that introduces the developer with impact
 */

export class Hero {
  constructor(options = {}) {
    this.container = options.container || document.querySelector('.hero');
    this.name = options.name || '';
    this.tagline = options.tagline || '';
    this.ctaButtons = options.ctaButtons || [];
    this.animationDelay = options.animationDelay || 100;
    this.hasAnimated = false;

    this.init();
  }

  /**
   * Initialize the hero component
   */
  init() {
    if (!this.container) {
      this.container = document.createElement('section');
      this.container.className = 'hero';
      const main = document.querySelector('main') || document.body;
      main.prepend(this.container);
    }

    this.render();
    this.animateIn();
  }

  /**
   * Render the hero HTML
   */
  render() {
    const html = `
      <div class="hero__container container">
        <div class="hero__content">
          ${this.renderName()}
          ${this.renderTagline()}
          ${this.renderCTAButtons()}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Render the name with large typography
   */
  renderName() {
    if (!this.name) return '';

    return `
      <h1 class="hero__name" data-hero-name>
        ${this.name}
      </h1>
    `;
  }

  /**
   * Render the tagline
   */
  renderTagline() {
    if (!this.tagline) return '';

    return `
      <p class="hero__tagline" data-hero-tagline>
        ${this.tagline}
      </p>
    `;
  }

  /**
   * Render CTA buttons
   */
  renderCTAButtons() {
    if (!this.ctaButtons || this.ctaButtons.length === 0) return '';

    const buttonsHtml = this.ctaButtons.map(button => {
      const variant = button.variant || 'primary';
      const external = button.external ? 'target="_blank" rel="noopener noreferrer"' : '';

      return `
        <a
          href="${button.path}"
          class="hero__cta hero__cta--${variant}"
          ${external}
          aria-label="${button.ariaLabel || button.label}"
        >
          ${button.label}
        </a>
      `;
    }).join('');

    return `
      <div class="hero__cta-container" data-hero-cta>
        ${buttonsHtml}
      </div>
    `;
  }

  /**
   * Animate hero content on load with fade-in effect
   */
  animateIn() {
    if (this.hasAnimated) return;

    // Add initial hidden state
    const elements = [
      this.container.querySelector('[data-hero-name]'),
      this.container.querySelector('[data-hero-tagline]'),
      this.container.querySelector('[data-hero-cta]'),
    ].filter(Boolean);

    elements.forEach(el => {
      el.classList.add('hero__element--hidden');
    });

    // Trigger animation after a short delay
    setTimeout(() => {
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.remove('hero__element--hidden');
          el.classList.add('hero__element--visible');
        }, index * 150); // Stagger animations by 150ms
      });

      this.hasAnimated = true;
    }, this.animationDelay);
  }

  /**
   * Update hero content
   * @param {Object} data - New hero data
   */
  update(data) {
    if (data.name !== undefined) this.name = data.name;
    if (data.tagline !== undefined) this.tagline = data.tagline;
    if (data.ctaButtons !== undefined) this.ctaButtons = data.ctaButtons;

    this.hasAnimated = false;
    this.render();
    this.animateIn();
  }

  /**
   * Destroy the hero component
   */
  destroy() {
    if (this.container) {
      this.container.remove();
    }
  }
}
