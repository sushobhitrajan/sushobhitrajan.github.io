/**
 * Info Widgets Component
 * Displays key information cards about LLM, MCP, and AI Agents
 */

export class InfoWidgets {
  constructor(options = {}) {
    this.container = options.container || null;
    this.widgets = options.widgets || [];

    this.init();
  }

  /**
   * Initialize the info widgets component
   */
  init() {
    if (!this.container) {
      this.container = document.createElement('section');
      this.container.className = 'info-widgets';
      this.container.id = 'skills'; // Add ID for navigation
      const hero = document.querySelector('.hero');
      if (hero && hero.nextSibling) {
        hero.parentNode.insertBefore(this.container, hero.nextSibling);
      } else if (hero) {
        hero.parentNode.appendChild(this.container);
      } else {
        document.querySelector('main')?.appendChild(this.container);
      }
    }

    this.render();
  }

  /**
   * Render the widgets HTML
   */
  render() {
    const html = `
      <div class="info-widgets__container container">
        <div class="info-widgets__grid">
          ${this.renderWidgets()}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Render individual widgets
   */
  renderWidgets() {
    if (!this.widgets || this.widgets.length === 0) {
      return this.renderDefaultWidgets();
    }

    return this.widgets.map(widget => this.renderWidget(widget)).join('');
  }

  /**
   * Render a single widget
   */
  renderWidget(widget) {
    const isClickable = widget.id === 'about-me';
    const widgetClass = isClickable ? 'info-widget info-widget--clickable' : 'info-widget';
    const widgetAttrs = isClickable ? 'role="button" tabindex="0"' : '';

    return `
      <div class="${widgetClass}" data-widget-id="${widget.id}" ${widgetAttrs}>
        ${widget.icon ? `<div class="info-widget__icon">${widget.icon}</div>` : ''}
        <h3 class="info-widget__title">${widget.title}</h3>
        <p class="info-widget__description">${widget.description}</p>
        ${widget.stats ? this.renderStats(widget.stats) : ''}
      </div>
    `;
  }

  /**
   * Render widget statistics
   */
  renderStats(stats) {
    return `
      <div class="info-widget__stats">
        ${stats.map(stat => `
          <div class="info-widget__stat">
            <span class="info-widget__stat-value">${stat.value}</span>
            <span class="info-widget__stat-label">${stat.label}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Render default widgets
   */
  renderDefaultWidgets() {
    const defaultWidgets = [
      {
        id: 'distributed-systems',
        icon: '',
        title: 'Distributed Systems',
        description: 'Building scalable, fault-tolerant systems that handle millions of requests. Expert in microservices architecture, API design, and cloud-native applications.',
        stats: [
          { value: 'Multi-region', label: 'Deployment' },
          { value: 'High Scale', label: 'Architecture' }
        ]
      },
      {
        id: 'machine-learning',
        icon: '',
        title: 'Machine Learning',
        description: 'Developing ML-powered recommendation systems, ranking algorithms, and intelligent features that boost discovery, sales, and user engagement at scale.',
        stats: [
          { value: 'Production', label: 'ML Systems' },
          { value: 'Real-time', label: 'Inference' }
        ]
      },
      {
        id: 'payment-systems',
        icon: '',
        title: 'Payment Systems',
        description: 'Architecting secure, scalable payment platforms for global markets. Led Amazon\'s co-branded credit card launch across Europe and Japan with seamless partner integration.',
        stats: [
          { value: 'Multi-region', label: 'Deployment' },
          { value: 'Bank-grade', label: 'Security' }
        ]
      },
      {
        id: 'cloud-storage',
        icon: '',
        title: 'Cloud Storage',
        description: 'Optimizing AWS EBS for performance and efficiency. Working on storage optimization, heat management, and block storage solutions for cloud infrastructure.',
        stats: [
          { value: 'AWS EBS', label: 'Platform' },
          { value: 'Petabyte', label: 'Scale' }
        ]
      }
    ];

    return defaultWidgets.map(widget => this.renderWidget(widget)).join('');
  }

  /**
   * Update widgets
   */
  update(widgets) {
    this.widgets = widgets;
    this.render();
  }

  /**
   * Destroy the component
   */
  destroy() {
    if (this.container) {
      this.container.remove();
    }
  }
}
