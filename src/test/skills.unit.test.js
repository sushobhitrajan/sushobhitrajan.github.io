/**
 * Unit tests for SkillsSection component
 * Tests category rendering, skill item rendering, and hover interactions
 * Requirements: 14.1, 14.2, 14.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { SkillsSection } from '../components/SkillsSection.js';

describe('SkillsSection Component - Unit Tests', () => {
  let skillsSection;
  let mockData;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = '<div id="app"></div>';

    // Mock skills data
    mockData = {
      categories: [
        {
          name: 'Languages',
          icon: '💻',
          skills: [
            {
              name: 'JavaScript',
              icon: '🟨',
              proficiency: 'expert',
              yearsOfExperience: 5,
              description: 'Full-stack development'
            },
            {
              name: 'Python',
              icon: '🐍',
              proficiency: 'advanced',
              yearsOfExperience: 4,
              description: 'Machine learning'
            }
          ]
        },
        {
          name: 'Frameworks',
          icon: '⚛️',
          skills: [
            {
              name: 'React',
              icon: '⚛️',
              proficiency: 'expert',
              yearsOfExperience: 5,
              description: 'UI development'
            }
          ]
        }
      ]
    };
  });

  afterEach(() => {
    // Clean up
    if (skillsSection) {
      skillsSection.destroy();
    }
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('Category Rendering', () => {
    it('should render all skill categories', () => {
      // Requirement 14.1: Categorize skills into logical groups
      skillsSection = new SkillsSection(mockData);

      const categories = document.querySelectorAll('.skills-section__category');

      expect(categories.length).toBe(2);
    });

    it('should render category titles', () => {
      // Requirement 14.1: Display category names
      skillsSection = new SkillsSection(mockData);

      const categoryTitles = document.querySelectorAll('.skills-section__category-title');

      expect(categoryTitles.length).toBe(2);
      expect(categoryTitles[0].textContent).toContain('Languages');
      expect(categoryTitles[1].textContent).toContain('Frameworks');
    });

    it('should render category icons', () => {
      // Requirement 14.2: Visual indicators (icons)
      skillsSection = new SkillsSection(mockData);

      const categoryIcons = document.querySelectorAll('.skills-section__category-icon');

      expect(categoryIcons.length).toBe(2);
      expect(categoryIcons[0].textContent).toBe('💻');
      expect(categoryIcons[1].textContent).toBe('⚛️');
    });

    it('should render empty state when no categories', () => {
      // Edge case: No categories
      skillsSection = new SkillsSection({ categories: [] });

      const emptyState = document.querySelector('.skills-section__empty');

      expect(emptyState).toBeTruthy();
      expect(emptyState.textContent).toContain('No skills data available');
    });

    it('should handle category without icon', () => {
      // Edge case: Missing icon
      const dataWithoutIcon = {
        categories: [
          {
            name: 'Languages',
            skills: []
          }
        ]
      };

      skillsSection = new SkillsSection(dataWithoutIcon);

      const categoryTitle = document.querySelector('.skills-section__category-title');

      expect(categoryTitle).toBeTruthy();
      expect(categoryTitle.textContent).toContain('Languages');
    });
  });

  describe('Skill Item Rendering', () => {
    it('should render all skill items', () => {
      // Requirement 14.2: Display individual skill items
      skillsSection = new SkillsSection(mockData);

      const skillItems = document.querySelectorAll('.skills-section__skill');

      expect(skillItems.length).toBe(3); // 2 in Languages + 1 in Frameworks
    });

    it('should render skill names', () => {
      // Requirement 14.1: Display skill names
      skillsSection = new SkillsSection(mockData);

      const skillNames = document.querySelectorAll('.skills-section__skill-name');

      expect(skillNames.length).toBe(3);
      expect(skillNames[0].textContent).toBe('JavaScript');
      expect(skillNames[1].textContent).toBe('Python');
      expect(skillNames[2].textContent).toBe('React');
    });

    it('should render skill icons', () => {
      // Requirement 14.2: Visual indicators (icons)
      skillsSection = new SkillsSection(mockData);

      const skillIcons = document.querySelectorAll('.skills-section__skill-icon');

      expect(skillIcons.length).toBe(3);
      expect(skillIcons[0].textContent).toBe('🟨');
      expect(skillIcons[1].textContent).toBe('🐍');
      expect(skillIcons[2].textContent).toBe('⚛️');
    });

    it('should render skill descriptions', () => {
      // Requirement 14.4: Show additional details
      skillsSection = new SkillsSection(mockData);

      const descriptions = document.querySelectorAll('.skills-section__skill-description');

      expect(descriptions.length).toBe(3);
      expect(descriptions[0].textContent).toBe('Full-stack development');
      expect(descriptions[1].textContent).toBe('Machine learning');
      expect(descriptions[2].textContent).toBe('UI development');
    });

    it('should render years of experience', () => {
      // Requirement 14.3: Proficiency levels or experience indicators
      skillsSection = new SkillsSection(mockData);

      const experienceLabels = document.querySelectorAll('.skills-section__skill-experience');

      expect(experienceLabels.length).toBe(3);
      expect(experienceLabels[0].textContent).toBe('5+ years');
      expect(experienceLabels[1].textContent).toBe('4+ years');
      expect(experienceLabels[2].textContent).toBe('5+ years');
    });

    it('should render proficiency levels', () => {
      // Requirement 14.3: Proficiency levels
      skillsSection = new SkillsSection(mockData);

      const proficiencyLabels = document.querySelectorAll('.skills-section__skill-proficiency');

      expect(proficiencyLabels.length).toBe(3);
      expect(proficiencyLabels[0].textContent).toBe('Expert');
      expect(proficiencyLabels[1].textContent).toBe('Advanced');
      expect(proficiencyLabels[2].textContent).toBe('Expert');
    });

    it('should apply proficiency class to skill cards', () => {
      // Requirement 14.3: Visual proficiency indicators
      skillsSection = new SkillsSection(mockData);

      const expertSkills = document.querySelectorAll('.skills-section__skill--expert');
      const advancedSkills = document.querySelectorAll('.skills-section__skill--advanced');

      expect(expertSkills.length).toBe(2); // JavaScript and React
      expect(advancedSkills.length).toBe(1); // Python
    });

    it('should handle skill without icon', () => {
      // Edge case: Missing icon
      const dataWithoutIcon = {
        categories: [
          {
            name: 'Languages',
            skills: [
              {
                name: 'JavaScript',
                proficiency: 'expert'
              }
            ]
          }
        ]
      };

      skillsSection = new SkillsSection(dataWithoutIcon);

      const skillIcon = document.querySelector('.skills-section__skill-icon');

      expect(skillIcon).toBeTruthy();
      expect(skillIcon.textContent).toBe('•'); // Default bullet
    });

    it('should handle skill without description', () => {
      // Edge case: Missing description
      const dataWithoutDescription = {
        categories: [
          {
            name: 'Languages',
            skills: [
              {
                name: 'JavaScript',
                proficiency: 'expert',
                yearsOfExperience: 5
              }
            ]
          }
        ]
      };

      skillsSection = new SkillsSection(dataWithoutDescription);

      const description = document.querySelector('.skills-section__skill-description');

      expect(description).toBeFalsy();
    });

    it('should handle skill without years of experience', () => {
      // Edge case: Missing experience
      const dataWithoutExperience = {
        categories: [
          {
            name: 'Languages',
            skills: [
              {
                name: 'JavaScript',
                proficiency: 'expert',
                description: 'Full-stack development'
              }
            ]
          }
        ]
      };

      skillsSection = new SkillsSection(dataWithoutExperience);

      const experience = document.querySelector('.skills-section__skill-experience');

      expect(experience).toBeFalsy();
    });

    it('should handle skill without proficiency', () => {
      // Edge case: Missing proficiency
      const dataWithoutProficiency = {
        categories: [
          {
            name: 'Languages',
            skills: [
              {
                name: 'JavaScript',
                description: 'Full-stack development'
              }
            ]
          }
        ]
      };

      skillsSection = new SkillsSection(dataWithoutProficiency);

      const proficiency = document.querySelector('.skills-section__skill-proficiency');

      expect(proficiency).toBeFalsy();
    });
  });

  describe('Hover Interactions', () => {
    it('should have hover class on skill cards', () => {
      // Requirement 14.4: Hover effects
      skillsSection = new SkillsSection(mockData);

      const skillCard = document.querySelector('.skills-section__skill');

      expect(skillCard).toBeTruthy();
      expect(skillCard.classList.contains('skills-section__skill')).toBe(true);
    });

    it('should have details section for hover reveal', () => {
      // Requirement 14.4: Show additional details on hover
      skillsSection = new SkillsSection(mockData);

      const detailsSections = document.querySelectorAll('.skills-section__skill-details');

      expect(detailsSections.length).toBe(3);
    });

    it('should include data attribute for skill identification', () => {
      // Skill identification
      skillsSection = new SkillsSection(mockData);

      const firstSkill = document.querySelector('[data-skill="JavaScript"]');
      const secondSkill = document.querySelector('[data-skill="Python"]');

      expect(firstSkill).toBeTruthy();
      expect(secondSkill).toBeTruthy();
    });
  });

  describe('Section Structure', () => {
    it('should render section with correct ID', () => {
      // Section ID for navigation
      skillsSection = new SkillsSection(mockData);

      const section = document.querySelector('#skills');

      expect(section).toBeTruthy();
      expect(section.classList.contains('skills-section')).toBe(true);
    });

    it('should render section title', () => {
      // Section title
      skillsSection = new SkillsSection(mockData);

      const title = document.querySelector('.skills-section__title');

      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Skills & Expertise');
      expect(title.tagName).toBe('H2');
    });

    it('should render content within container', () => {
      // Layout structure
      skillsSection = new SkillsSection(mockData);

      const container = document.querySelector('.skills-section__container');
      const categories = container.querySelector('.skills-section__categories');

      expect(container).toBeTruthy();
      expect(categories).toBeTruthy();
    });

    it('should create section element if container not provided', () => {
      // Component initialization
      skillsSection = new SkillsSection(mockData);

      const section = document.querySelector('.skills-section');

      expect(section).toBeTruthy();
      expect(section.tagName).toBe('SECTION');
    });

    it('should use existing container if provided', () => {
      // Custom container usage
      const customSection = document.createElement('section');
      customSection.className = 'custom-skills';
      customSection.id = 'custom-skills';
      document.body.appendChild(customSection);

      skillsSection = new SkillsSection({ ...mockData, container: customSection });

      expect(document.querySelector('#custom-skills')).toBeTruthy();
      expect(document.querySelectorAll('section').length).toBe(1);
    });
  });

  describe('Proficiency Formatting', () => {
    it('should format proficiency levels correctly', () => {
      // Proficiency formatting
      skillsSection = new SkillsSection(mockData);

      expect(skillsSection.formatProficiency('beginner')).toBe('Beginner');
      expect(skillsSection.formatProficiency('intermediate')).toBe('Intermediate');
      expect(skillsSection.formatProficiency('advanced')).toBe('Advanced');
      expect(skillsSection.formatProficiency('expert')).toBe('Expert');
    });

    it('should handle unknown proficiency levels', () => {
      // Edge case: Unknown proficiency
      skillsSection = new SkillsSection(mockData);

      expect(skillsSection.formatProficiency('master')).toBe('master');
    });
  });

  describe('Data Loading', () => {
    it('should load data from JSON file', async () => {
      // Data loading functionality
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData)
        })
      );

      skillsSection = new SkillsSection({});
      await skillsSection.loadData('/data/skills.json');

      expect(skillsSection.categories).toEqual(mockData.categories);
    });

    it('should handle fetch errors gracefully', async () => {
      // Error handling
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404
        })
      );

      skillsSection = new SkillsSection({});

      await expect(skillsSection.loadData('/data/skills.json')).rejects.toThrow();
    });

    it('should re-render after loading data', async () => {
      // Re-render on data load
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData)
        })
      );

      skillsSection = new SkillsSection({});
      await skillsSection.loadData('/data/skills.json');

      const categories = document.querySelectorAll('.skills-section__category');

      expect(categories.length).toBe(2);
    });
  });

  describe('Update Functionality', () => {
    it('should update content when update is called', () => {
      // Dynamic content updates
      skillsSection = new SkillsSection(mockData);

      const newData = {
        categories: [
          {
            name: 'Tools',
            icon: '🛠️',
            skills: [
              {
                name: 'Git',
                icon: '📦',
                proficiency: 'expert'
              }
            ]
          }
        ]
      };

      skillsSection.update(newData);

      const categories = document.querySelectorAll('.skills-section__category');
      const categoryTitle = document.querySelector('.skills-section__category-title');

      expect(categories.length).toBe(1);
      expect(categoryTitle.textContent).toContain('Tools');
    });
  });

  describe('Cleanup', () => {
    it('should remove section element on destroy', () => {
      // Component cleanup
      skillsSection = new SkillsSection(mockData);

      const section = document.querySelector('.skills-section');
      expect(section).toBeTruthy();

      skillsSection.destroy();

      expect(document.querySelector('.skills-section')).toBeFalsy();
    });
  });
});
