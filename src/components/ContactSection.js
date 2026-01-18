/**
 * Contact Section Component
 * Displays contact information and social links
 */

export class ContactSection {
  constructor(options = {}) {
    this.container = options.container || null;
    this.name = options.name || '';
    this.email = options.email || '';
    this.socialLinks = options.socialLinks || [];
    this.callToAction = options.callToAction || '';

    this.init();
  }

  /**
   * Initialize the contact section component
   */
  init() {
    if (!this.container) {
      this.container = document.createElement('section');
      this.container.className = 'contact-section';
      this.container.id = 'contact';
      document.querySelector('main').appendChild(this.container);
    }

    this.render();
  }

  /**
   * Render the contact section HTML
   */
  render() {
    const html = `
      <div class="contact-section__container container">
        <h2 class="contact-section__title">Get In Touch</h2>

        ${this.callToAction ? `<p class="contact-section__cta">${this.callToAction}</p>` : ''}

        <div class="contact-section__content">
          <div class="contact-section__info">
            ${this.name ? `<p class="contact-section__name">${this.name}</p>` : ''}
            ${this.email ? `
              <a href="mailto:${this.email}" class="contact-section__email">
                ${this.email}
              </a>
            ` : ''}
          </div>

          ${this.socialLinks.length > 0 ? `
            <div class="contact-section__social">
              ${this.renderSocialLinks()}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Render social media links
   */
  renderSocialLinks() {
    return this.socialLinks.map(link => `
      <a
        href="${link.url}"
        class="contact-section__social-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${link.platform}"
      >
        ${link.icon ? `<span class="contact-section__social-icon">${link.icon}</span>` : ''}
        <span class="contact-section__social-label">${link.platform}</span>
      </a>
    `).join('');
  }

  /**
   * Load data from JSON file
   * @param {string} dataPath - Path to the JSON data file
   */
  async loadData(dataPath) {
    try {
      const response = await fetch(dataPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      this.name = data.name || this.name;
      this.email = data.email || this.email;
      this.socialLinks = data.socialLinks || this.socialLinks;
      this.callToAction = data.callToAction || this.callToAction;

      this.render();

      return data;
    } catch (error) {
      console.error('Failed to load contact data:', error);
      throw error;
    }
  }

  /**
   * Update contact section content
   * @param {Object} data - New contact data
   */
  update(data) {
    if (data.name !== undefined) this.name = data.name;
    if (data.email !== undefined) this.email = data.email;
    if (data.socialLinks !== undefined) this.socialLinks = data.socialLinks;
    if (data.callToAction !== undefined) this.callToAction = data.callToAction;

    this.render();
  }

  /**
   * Destroy the contact section component
   */
  destroy() {
    if (this.container) {
      this.container.remove();
    }
  }
}
