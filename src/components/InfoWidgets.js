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
    return `
      <div class="info-widget" data-widget-id="${widget.id}">
        <div class="info-widget__icon">${widget.icon}</div>
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
        id: 'llm',
        icon: '🧠',
        title: 'Large Language Models',
        description: 'Leveraging GPT-4, Claude, and other state-of-the-art LLMs to build intelligent applications with advanced reasoning capabilities.',
        stats: [
          { value: '100B+', label: 'Parameters' },
          { value: '99%', label: 'Accuracy' }
        ]
      },
      {
        id: 'mcp',
        icon: '🔌',
        title: 'Model Context Protocol',
        description: 'Implementing MCP servers and tools to enable seamless integration between AI agents and external systems, APIs, and data sources.',
        stats: [
          { value: '50+', label: 'Tools' },
          { value: 'Real-time', label: 'Integration' }
        ]
      },
      {
        id: 'agents',
        icon: '🤖',
        title: 'Autonomous Agents',
        description: 'Building self-directed AI systems that can plan, execute tasks, and adapt to changing environments using advanced agent architectures.',
        stats: [
          { value: 'Multi-step', label: 'Reasoning' },
          { value: 'Adaptive', label: 'Learning' }
        ]
      },
      {
        id: 'rag',
        icon: '📚',
        title: 'RAG Systems',
        description: 'Designing Retrieval-Augmented Generation pipelines with vector databases to provide AI agents with relevant, up-to-date context.',
        stats: [
          { value: 'Vector', label: 'Search' },
          { value: 'Dynamic', label: 'Context' }
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
