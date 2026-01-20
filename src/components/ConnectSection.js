/**
 * Connect Section Component
 * Displays connection options for mentorship and guidance
 */

export class ConnectSection {
  constructor() {
    this.data = null;
  }

  async loadData() {
    try {
      const response = await fetch('/src/data/connect.json');
      this.data = await response.json();
    } catch (error) {
      console.error('Error loading connect data:', error);
    }
  }

  render() {
    if (!this.data) {
      return '<div class="connect-section__loading">Loading...</div>';
    }

    const connectionsHTML = this.data.connections.map(connection => `
      <div class="connect-card">
        <div class="connect-card__icon">${connection.icon}</div>
        <h3 class="connect-card__title">${connection.title}</h3>
        <p class="connect-card__description">${connection.description}</p>

        <div class="connect-card__tags">
          ${connection.tags.map(tag => `
            <span class="connect-tag">${tag}</span>
          `).join('')}
        </div>

        <a href="${connection.link}" target="_blank" rel="noopener noreferrer" class="connect-card__link">
          ${connection.linkText}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    `).join('');

    return `
      <section id="connect" class="connect-section">
        <div class="connect-section__container">
          <div class="connect-section__header">
            <h2 class="connect-section__title">${this.data.title}</h2>
            <p class="connect-section__subtitle">${this.data.subtitle}</p>
          </div>

          <div class="connect-section__grid">
            ${connectionsHTML}
          </div>
        </div>
      </section>
    `;
  }

  async init() {
    await this.loadData();
    const container = document.getElementById('connect-section-container');
    if (container) {
      container.innerHTML = this.render();
    }
  }
}
