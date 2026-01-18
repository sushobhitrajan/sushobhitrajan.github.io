/**
 * Navigation Component
 * Provides site-wide navigation with fixed positioning and backdrop blur
 */

export class Navigation {
  constructor(options = {}) {
    this.container = options.container || document.querySelector('nav');
    this.links = options.links || [];
    this.activeLink = options.activeLink || null;
    this.profileImage = options.profileImage || null;
    this.scrollThreshold = 50;

    this.init();
  }

  /**
   * Initialize the navigation component
   */
  init() {
    if (!this.container) {
      this.container = document.createElement('nav');
      this.container.className = 'navigation';
      document.body.prepend(this.container);
    }

    this.render();
    this.attachEventListeners();
    this.handleScroll(); // Initial scroll check
  }

  /**
   * Render the navigation HTML
   */
  render() {
    const html = `
      <div class="navigation__container container">
        ${this.renderProfile()}
        ${this.renderLinks()}
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Render profile image/avatar
   */
  renderProfile() {
    if (!this.profileImage) return '';

    return `
      <a href="/" class="navigation__profile" aria-label="Home">
        <img
          src="${this.profileImage}"
          alt="Profile"
          class="navigation__profile-image"
        />
      </a>
    `;
  }

  /**
   * Render navigation links
   */
  renderLinks() {
    if (!this.links || this.links.length === 0) return '';

    const linksHtml = this.links.map(link => {
      const isActive = this.activeLink === link.id;
      const activeClass = isActive ? 'navigation__link--active' : '';

      return `
        <a
          href="${link.path}"
          class="navigation__link ${activeClass}"
          data-link-id="${link.id}"
          ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
        >
          ${link.label}
        </a>
      `;
    }).join('');

    return `
      <div class="navigation__links">
        ${linksHtml}
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Scroll event for backdrop blur effect
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });

    // Link clicks for active state
    const links = this.container.querySelectorAll('.navigation__link');
    links.forEach(link => {
      link.addEventListener('click', this.handleLinkClick.bind(this));
    });
  }

  /**
   * Handle scroll event for styling updates
   */
  handleScroll() {
    const scrolled = window.scrollY > this.scrollThreshold;

    if (scrolled) {
      this.container.classList.add('navigation--scrolled');
    } else {
      this.container.classList.remove('navigation--scrolled');
    }
  }

  /**
   * Handle link click
   */
  handleLinkClick(event) {
    const link = event.currentTarget;
    const linkId = link.dataset.linkId;

    // Update active link
    this.setActive(linkId);
  }

  /**
   * Set active link
   * @param {string} linkId - The ID of the link to set as active
   */
  setActive(linkId) {
    this.activeLink = linkId;

    // Remove active class from all links
    const links = this.container.querySelectorAll('.navigation__link');
    links.forEach(link => {
      link.classList.remove('navigation__link--active');
    });

    // Add active class to the specified link
    const activeLink = this.container.querySelector(`[data-link-id="${linkId}"]`);
    if (activeLink) {
      activeLink.classList.add('navigation__link--active');
    }
  }

  /**
   * Update navigation links
   * @param {Array} links - New array of links
   */
  updateLinks(links) {
    this.links = links;
    this.render();
    this.attachEventListeners();
  }

  /**
   * Destroy the navigation component
   */
  destroy() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));

    if (this.container) {
      this.container.remove();
    }
  }
}
