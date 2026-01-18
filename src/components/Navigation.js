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
    this.isMobileMenuOpen = false;
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
        ${this.renderMobileToggle()}
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
      <div class="navigation__links" data-mobile-menu>
        ${linksHtml}
      </div>
    `;
  }

  /**
   * Render mobile menu toggle button
   */
  renderMobileToggle() {
    return `
      <button
        class="navigation__toggle"
        aria-label="Toggle menu"
        aria-expanded="false"
        data-mobile-toggle
      >
        <span class="navigation__toggle-icon"></span>
      </button>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Scroll event for backdrop blur effect
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });

    // Mobile menu toggle
    const toggleButton = this.container.querySelector('[data-mobile-toggle]');
    if (toggleButton) {
      toggleButton.addEventListener('click', this.handleMobileMenuToggle.bind(this));
    }

    // Link clicks for active state
    const links = this.container.querySelectorAll('.navigation__link');
    links.forEach(link => {
      link.addEventListener('click', this.handleLinkClick.bind(this));
    });

    // Close mobile menu on outside click
    document.addEventListener('click', this.handleOutsideClick.bind(this));

    // Close mobile menu on escape key
    document.addEventListener('keydown', this.handleEscapeKey.bind(this));
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
   * Handle mobile menu toggle
   */
  handleMobileMenuToggle(event) {
    event.stopPropagation();
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    const menu = this.container.querySelector('[data-mobile-menu]');
    const toggle = this.container.querySelector('[data-mobile-toggle]');

    if (this.isMobileMenuOpen) {
      menu.classList.add('navigation__links--open');
      toggle.classList.add('navigation__toggle--active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      menu.classList.remove('navigation__links--open');
      toggle.classList.remove('navigation__toggle--active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
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

    // Close mobile menu if open
    if (this.isMobileMenuOpen) {
      // Create a synthetic event to close the menu
      const syntheticEvent = new Event('click');
      syntheticEvent.stopPropagation = () => {};
      this.closeMobileMenu();
    }
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    if (!this.isMobileMenuOpen) return;

    this.isMobileMenuOpen = false;

    const menu = this.container.querySelector('[data-mobile-menu]');
    const toggle = this.container.querySelector('[data-mobile-toggle]');

    if (menu && toggle) {
      menu.classList.remove('navigation__links--open');
      toggle.classList.remove('navigation__toggle--active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  /**
   * Handle outside click to close mobile menu
   */
  handleOutsideClick(event) {
    if (!this.isMobileMenuOpen) return;

    const isClickInside = this.container.contains(event.target);
    if (!isClickInside) {
      this.closeMobileMenu();
    }
  }

  /**
   * Handle escape key to close mobile menu
   */
  handleEscapeKey(event) {
    if (event.key === 'Escape' && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
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
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
    document.removeEventListener('keydown', this.handleEscapeKey.bind(this));

    if (this.container) {
      this.container.remove();
    }
  }
}
