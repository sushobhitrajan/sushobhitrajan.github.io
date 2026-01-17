/**
 * About Section Component
 * Introduces the developer with bio, photo, and key highlights
 */

export class AboutSection {
  constructor(options = {}) {
    this.container = options.container || null;
    this.bio = options.bio || [];
    this.photo = options.photo || null;
    this.highlights = options.highlights || [];
    this.resumeLink = options.resumeLink || null;
    this.currentFocus = options.currentFocus || [];
    this.name = options.name || '';
    this.photoLoaded = false;

    this.init();
  }

  /**
   * Initialize the about section component
   */
  init() {
    if (!this.container) {
      this.container = document.createElement('section');
      this.container.className = 'about-section';
      this.container.id = 'about';
    }

    this.render();
    this.setupLazyLoading();
  }

  /**
   * Render the about section HTML
   */
  render() {
    const html = `
      <div class="about-section__container container">
        <h2 class="about-section__title">About Me</h2>
        <div class="about-section__content">
          ${this.renderPhoto()}
          <div class="about-section__text">
            ${this.renderBio()}
            ${this.renderHighlights()}
            ${this.renderCurrentFocus()}
            ${this.renderResumeLink()}
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Render profile photo with lazy loading
   */
  renderPhoto() {
    if (!this.photo) return '';

    return `
      <div class="about-section__photo-wrapper">
        <img
          src="${this.photo}"
          alt="${this.name || 'Profile photo'}"
          class="about-section__photo"
          loading="lazy"
          data-about-photo
        />
      </div>
    `;
  }

  /**
   * Render bio paragraphs
   */
  renderBio() {
    if (!this.bio || this.bio.length === 0) return '';

    const bioParagraphs = this.bio.map(paragraph => `
      <p class="about-section__bio-paragraph">${paragraph}</p>
    `).join('');

    return `
      <div class="about-section__bio">
        ${bioParagraphs}
      </div>
    `;
  }

  /**
   * Render highlights list
   */
  renderHighlights() {
    if (!this.highlights || this.highlights.length === 0) return '';

    const highlightItems = this.highlights.map(highlight => `
      <li class="about-section__highlight-item">${highlight}</li>
    `).join('');

    return `
      <div class="about-section__highlights">
        <h3 class="about-section__subtitle">Highlights</h3>
        <ul class="about-section__highlight-list">
          ${highlightItems}
        </ul>
      </div>
    `;
  }

  /**
   * Render current focus areas
   */
  renderCurrentFocus() {
    if (!this.currentFocus || this.currentFocus.length === 0) return '';

    const focusItems = this.currentFocus.map(focus => `
      <li class="about-section__focus-item">${focus}</li>
    `).join('');

    return `
      <div class="about-section__focus">
        <h3 class="about-section__subtitle">Current Focus</h3>
        <ul class="about-section__focus-list">
          ${focusItems}
        </ul>
      </div>
    `;
  }

  /**
   * Render resume download link
   */
  renderResumeLink() {
    if (!this.resumeLink) return '';

    return `
      <div class="about-section__resume">
        <a
          href="${this.resumeLink}"
          class="about-section__resume-link"
          download
          aria-label="Download resume"
        >
          <svg class="about-section__resume-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12.5L6.25 8.75L7.5 7.4375L9.375 9.3125V2.5H10.625V9.3125L12.5 7.4375L13.75 8.75L10 12.5ZM5 17.5C4.65625 17.5 4.36458 17.3802 4.125 17.1406C3.88542 16.901 3.76562 16.6094 3.76562 16.2656V13.75H5V16.25H15V13.75H16.25V16.2656C16.25 16.6094 16.1302 16.901 15.8906 17.1406C15.651 17.3802 15.3594 17.5 15.0156 17.5H5Z" fill="currentColor"/>
          </svg>
          Download Resume
        </a>
      </div>
    `;
  }

  /**
   * Setup lazy loading for profile photo
   */
  setupLazyLoading() {
    const photo = this.container.querySelector('[data-about-photo]');
    if (!photo) return;

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.photoLoaded) {
            this.lazyLoadPhoto(photo);
            observer.unobserve(photo);
          }
        });
      }, {
        rootMargin: '50px'
      });

      observer.observe(photo);
    } else {
      // Fallback: load immediately if IntersectionObserver not supported
      this.lazyLoadPhoto(photo);
    }
  }

  /**
   * Lazy load profile photo
   */
  lazyLoadPhoto(photoElement) {
    if (this.photoLoaded) return;

    photoElement.addEventListener('load', () => {
      photoElement.classList.add('about-section__photo--loaded');
      this.photoLoaded = true;
    });

    photoElement.addEventListener('error', () => {
      photoElement.classList.add('about-section__photo--error');
      photoElement.alt = 'Profile photo unavailable';
    });

    // If already loaded (from cache), trigger the loaded state
    if (photoElement.complete) {
      photoElement.classList.add('about-section__photo--loaded');
      this.photoLoaded = true;
    }
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

      this.bio = data.bio || [];
      this.photo = data.photo || null;
      this.highlights = data.highlights || [];
      this.resumeLink = data.resumeLink || null;
      this.currentFocus = data.currentFocus || [];
      this.name = data.name || '';

      this.photoLoaded = false;
      this.render();
      this.setupLazyLoading();

      return data;
    } catch (error) {
      console.error('Failed to load about data:', error);
      throw error;
    }
  }

  /**
   * Update about section content
   * @param {Object} data - New about data
   */
  update(data) {
    if (data.bio !== undefined) this.bio = data.bio;
    if (data.photo !== undefined) this.photo = data.photo;
    if (data.highlights !== undefined) this.highlights = data.highlights;
    if (data.resumeLink !== undefined) this.resumeLink = data.resumeLink;
    if (data.currentFocus !== undefined) this.currentFocus = data.currentFocus;
    if (data.name !== undefined) this.name = data.name;

    this.photoLoaded = false;
    this.render();
    this.setupLazyLoading();
  }

  /**
   * Destroy the about section component
   */
  destroy() {
    if (this.container) {
      this.container.remove();
    }
  }
}
