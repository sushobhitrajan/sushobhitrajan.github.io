/**
 * Skills Section Component
 * Showcases technical skills organized by category
 */

export class SkillsSection {
  constructor(options = {}) {
    this.container = options.container || null;
    this.categories = options.categories || [];

    this.init();
  }

  /**
   * Initialize the skills section component
   */
  init() {
    if (!this.container) {
      this.container = document.createElement('section');
      this.container.className = 'skills-section';
      this.container.id = 'skills';
    }

    this.render();
  }

  /**
   * Render the skills section HTML
   */
  render() {
    const html = `
      <div class="skills-section__container container">
        <h2 class="skills-section__title">Skills & Expertise</h2>
        <div class="skills-section__categories">
          ${this.renderCategories()}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Render skill categories
   */
  renderCategories() {
    if (!this.categories || this.categories.length === 0) {
      return '<p class="skills-section__empty">No skills data available.</p>';
    }

    return this.categories.map(category => this.renderCategory(category)).join('');
  }

  /**
   * Render a single skill category
   * @param {Object} category - Category data
   */
  renderCategory(category) {
    return `
      <div class="skills-section__category">
        <h3 class="skills-section__category-title">
          <span class="skills-section__category-icon">${category.icon || ''}</span>
          ${category.name}
        </h3>
        <div class="skills-section__skills-grid">
          ${this.renderSkills(category.skills)}
        </div>
      </div>
    `;
  }

  /**
   * Render skills for a category
   * @param {Array} skills - Array of skill objects
   */
  renderSkills(skills) {
    if (!skills || skills.length === 0) {
      return '';
    }

    return skills.map(skill => this.renderSkillItem(skill)).join('');
  }

  /**
   * Render a single skill item
   * @param {Object} skill - Skill data
   */
  renderSkillItem(skill) {
    const proficiencyClass = `skills-section__skill--${skill.proficiency || 'intermediate'}`;

    return `
      <div class="skills-section__skill ${proficiencyClass}" data-skill="${skill.name}">
        <div class="skills-section__skill-header">
          <span class="skills-section__skill-icon">${skill.icon || '•'}</span>
          <span class="skills-section__skill-name">${skill.name}</span>
        </div>
        <div class="skills-section__skill-details">
          ${skill.description ? `<p class="skills-section__skill-description">${skill.description}</p>` : ''}
          ${skill.yearsOfExperience ? `<p class="skills-section__skill-experience">${skill.yearsOfExperience}+ years</p>` : ''}
          ${skill.proficiency ? `<span class="skills-section__skill-proficiency">${this.formatProficiency(skill.proficiency)}</span>` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Format proficiency level for display
   * @param {string} proficiency - Proficiency level
   */
  formatProficiency(proficiency) {
    const levels = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'expert': 'Expert'
    };

    return levels[proficiency] || proficiency;
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

      this.categories = data.categories || [];

      this.render();

      return data;
    } catch (error) {
      console.error('Failed to load skills data:', error);
      throw error;
    }
  }

  /**
   * Update skills section content
   * @param {Object} data - New skills data
   */
  update(data) {
    if (data.categories !== undefined) {
      this.categories = data.categories;
    }

    this.render();
  }

  /**
   * Destroy the skills section component
   */
  destroy() {
    if (this.container) {
      this.container.remove();
    }
  }
}
