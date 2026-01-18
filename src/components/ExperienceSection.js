/**
 * Experience Section Component
 * Displays professional experience timeline
 */

export class ExperienceSection {
  constructor(options = {}) {
    this.container = options.container || null;
    this.experiences = options.experiences || [];
    this.dataLoaded = false;

    this.init();
  }

  /**
   * Initialize the experience section component
   */
  init() {
    if (!this.container) {
      this.container = document.createElement('section');
      this.container.id = 'experience';
      this.container.className = 'experience-section';

      // Insert after skills section or before projects
      const skillsSection = document.querySelector('#skills');
      const projectsSection = document.querySelector('#projects');

      if (skillsSection && skillsSection.nextSibling) {
        skillsSection.parentNode.insertBefore(this.container, skillsSection.nextSibling);
      } else if (projectsSection) {
        projectsSection.parentNode.insertBefore(this.container, projectsSection);
      } else {
        document.querySelector('main')?.appendChild(this.container);
      }
    }

    this.render();
  }

  /**
   * Load experience data from JSON file
   */
  async loadData(dataPath) {
    try {
      const response = await fetch(dataPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.experiences = data.experiences || [];
      this.dataLoaded = true;
      this.render();
    } catch (error) {
      console.error('Failed to load experience data:', error);
      this.dataLoaded = false;
      this.render();
    }
  }

  /**
   * Render the experience section HTML
   */
  render() {
    const html = `
      <div class="experience-section__container container">
        <div class="experience-section__header">
          <h2 class="experience-section__title">Experience</h2>
          <p class="experience-section__subtitle">My professional journey</p>
        </div>
        <div class="experience-section__timeline">
          ${this.renderExperiences()}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  /**
   * Render all experience entries
   */
  renderExperiences() {
    if (!this.dataLoaded || this.experiences.length === 0) {
      return '<p class="experience-section__loading">Loading experience...</p>';
    }

    return this.experiences.map(exp => this.renderExperience(exp)).join('');
  }

  /**
   * Render a single experience entry
   */
  renderExperience(experience) {
    return `
      <div class="experience-entry">
        <div class="experience-entry__company">
          ${experience.logo ? `<img src="${experience.logo}" alt="${experience.company}" class="experience-entry__logo" onerror="this.style.display='none'">` : ''}
          <div class="experience-entry__company-info">
            <h3 class="experience-entry__company-name">
              ${experience.website ? `<a href="${experience.website}" target="_blank" rel="noopener noreferrer">${experience.company}</a>` : experience.company}
            </h3>
            <p class="experience-entry__location">${experience.location}</p>
          </div>
        </div>
        <div class="experience-entry__roles">
          ${experience.roles.map(role => this.renderRole(role)).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Render a single role within an experience
   */
  renderRole(role) {
    const startDate = this.formatDate(role.startDate);
    const endDate = role.endDate === 'present' ? 'Present' : this.formatDate(role.endDate);
    const duration = this.calculateDuration(role.startDate, role.endDate);

    return `
      <div class="experience-role">
        <div class="experience-role__header">
          <h4 class="experience-role__title">${role.title}</h4>
          <p class="experience-role__duration">
            ${startDate} - ${endDate} · ${duration}
          </p>
        </div>
        <p class="experience-role__description">${role.description}</p>
        ${role.achievements && role.achievements.length > 0 ? `
          <ul class="experience-role__achievements">
            ${role.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
          </ul>
        ` : ''}
        ${role.technologies && role.technologies.length > 0 ? `
          <div class="experience-role__technologies">
            ${role.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Format date string (YYYY-MM) to readable format
   */
  formatDate(dateStr) {
    if (!dateStr || dateStr === 'present') return dateStr;

    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  }

  /**
   * Calculate duration between two dates
   */
  calculateDuration(startDate, endDate) {
    const start = new Date(startDate + '-01');
    const end = endDate === 'present' ? new Date() : new Date(endDate + '-01');

    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'yr' : 'yrs'}`;
    } else {
      return `${years} ${years === 1 ? 'yr' : 'yrs'} ${remainingMonths} ${remainingMonths === 1 ? 'mo' : 'mos'}`;
    }
  }

  /**
   * Update experiences
   */
  update(experiences) {
    this.experiences = experiences;
    this.dataLoaded = true;
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
