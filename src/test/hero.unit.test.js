/**
 * Unit tests for Hero component
 * Tests rendering with data, animation initialization, and responsive layout
 * Requirements: 5.1, 5.2, 5.3
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Hero } from '../components/Hero.js';

describe('Hero Component - Unit Tests', () => {
  let hero;
  let mockData;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = '<div id="app"></div>';

    // Mock hero data
    mockData = {
      name: 'John Doe',
      tagline: 'Software Engineer & Developer',
      ctaButtons: [
        { label: 'View Projects', path: '/projects', variant: 'primary' },
        { label: 'Contact Me', path: '/contact', variant: 'secondary' },
      ],
    };

    // Mock timers for animation testing
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Clean up
    if (hero) {
      hero.destroy();
    }
    document.body.innerHTML = '';
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('Rendering with Data', () => {
    it('should render hero section with name', () => {
      // Requirement 5.1: Display developer's name in large typeface
      hero = new Hero(mockData);

      const nameElement = document.querySelector('.hero__name');

      expect(nameElement).toBeTruthy();
      expect(nameElement.textContent.trim()).toBe('John Doe');
      expect(nameElement.tagName).toBe('H1');
    });

    it('should render hero section with tagline', () => {
      // Requirement 5.2: Include tagline or role description
      hero = new Hero(mockData);

      const taglineElement = document.querySelector('.hero__tagline');

      expect(taglineElement).toBeTruthy();
      expect(taglineElement.textContent.trim()).toBe('Software Engineer & Developer');
    });

    it('should render CTA buttons', () => {
      // Requirement 5.2: Include prominent call-to-action buttons
      hero = new Hero(mockData);

      const ctaButtons = document.querySelectorAll('.hero__cta');

      expect(ctaButtons.length).toBe(2);
      expect(ctaButtons[0].textContent.trim()).toBe('View Projects');
      expect(ctaButtons[1].textContent.trim()).toBe('Contact Me');
    });

    it('should render primary CTA button with correct variant class', () => {
      // Requirement 5.2: CTA button styling
      hero = new Hero(mockData);

      const primaryButton = document.querySelector('.hero__cta--primary');

      expect(primaryButton).toBeTruthy();
      expect(primaryButton.textContent.trim()).toBe('View Projects');
      expect(primaryButton.href).toContain('/projects');
    });

    it('should render secondary CTA button with correct variant class', () => {
      // Requirement 5.2: CTA button styling
      hero = new Hero(mockData);

      const secondaryButton = document.querySelector('.hero__cta--secondary');

      expect(secondaryButton).toBeTruthy();
      expect(secondaryButton.textContent.trim()).toBe('Contact Me');
      expect(secondaryButton.href).toContain('/contact');
    });

    it('should render without name when not provided', () => {
      // Edge case: Missing name
      hero = new Hero({ tagline: 'Developer', ctaButtons: [] });

      const nameElement = document.querySelector('.hero__name');

      expect(nameElement).toBeFalsy();
    });

    it('should render without tagline when not provided', () => {
      // Edge case: Missing tagline
      hero = new Hero({ name: 'John Doe', ctaButtons: [] });

      const taglineElement = document.querySelector('.hero__tagline');

      expect(taglineElement).toBeFalsy();
    });

    it('should render without CTA buttons when not provided', () => {
      // Edge case: No CTA buttons
      hero = new Hero({ name: 'John Doe', tagline: 'Developer' });

      const ctaContainer = document.querySelector('.hero__cta-container');

      expect(ctaContainer).toBeFalsy();
    });

    it('should render external links with correct attributes', () => {
      // External link handling
      const dataWithExternalLink = {
        ...mockData,
        ctaButtons: [
          { label: 'GitHub', path: 'https://github.com', variant: 'primary', external: true },
        ],
      };

      hero = new Hero(dataWithExternalLink);

      const externalLink = document.querySelector('.hero__cta');

      expect(externalLink.getAttribute('target')).toBe('_blank');
      expect(externalLink.getAttribute('rel')).toBe('noopener noreferrer');
    });

    it('should render internal links without external attributes', () => {
      // Internal link handling
      hero = new Hero(mockData);

      const internalLink = document.querySelector('.hero__cta--primary');

      expect(internalLink.getAttribute('target')).toBeFalsy();
      expect(internalLink.getAttribute('rel')).toBeFalsy();
    });

    it('should include aria-label for accessibility', () => {
      // Accessibility requirement
      const dataWithAriaLabel = {
        ...mockData,
        ctaButtons: [
          { label: 'Projects', path: '/projects', variant: 'primary', ariaLabel: 'View all projects' },
        ],
      };

      hero = new Hero(dataWithAriaLabel);

      const button = document.querySelector('.hero__cta');

      expect(button.getAttribute('aria-label')).toBe('View all projects');
    });

    it('should use label as aria-label when not provided', () => {
      // Default aria-label behavior
      hero = new Hero(mockData);

      const button = document.querySelector('.hero__cta--primary');

      expect(button.getAttribute('aria-label')).toBe('View Projects');
    });
  });

  describe('Animation Initialization', () => {
    it('should add hidden class to elements initially', () => {
      // Requirement 5.6: Fade-in animation on load
      hero = new Hero(mockData);

      const nameElement = document.querySelector('[data-hero-name]');
      const taglineElement = document.querySelector('[data-hero-tagline]');
      const ctaElement = document.querySelector('[data-hero-cta]');

      expect(nameElement.classList.contains('hero__element--hidden')).toBe(true);
      expect(taglineElement.classList.contains('hero__element--hidden')).toBe(true);
      expect(ctaElement.classList.contains('hero__element--hidden')).toBe(true);
    });

    it('should trigger animation after delay', () => {
      // Requirement 5.6: Smooth fade-in effect
      hero = new Hero(mockData);

      const nameElement = document.querySelector('[data-hero-name]');

      expect(nameElement.classList.contains('hero__element--visible')).toBe(false);

      // Fast-forward past animation delay
      vi.advanceTimersByTime(100);

      expect(nameElement.classList.contains('hero__element--visible')).toBe(true);
      expect(nameElement.classList.contains('hero__element--hidden')).toBe(false);
    });

    it('should stagger animations for multiple elements', () => {
      // Requirement 5.6: Staggered animation effect
      hero = new Hero(mockData);

      const nameElement = document.querySelector('[data-hero-name]');
      const taglineElement = document.querySelector('[data-hero-tagline]');
      const ctaElement = document.querySelector('[data-hero-cta]');

      // After initial delay, first element should animate
      vi.advanceTimersByTime(100);
      expect(nameElement.classList.contains('hero__element--visible')).toBe(true);
      expect(taglineElement.classList.contains('hero__element--visible')).toBe(false);

      // After 150ms more, second element should animate
      vi.advanceTimersByTime(150);
      expect(taglineElement.classList.contains('hero__element--visible')).toBe(true);
      expect(ctaElement.classList.contains('hero__element--visible')).toBe(false);

      // After 150ms more, third element should animate
      vi.advanceTimersByTime(150);
      expect(ctaElement.classList.contains('hero__element--visible')).toBe(true);
    });

    it('should set hasAnimated flag after animation', () => {
      // Animation state tracking
      hero = new Hero(mockData);

      expect(hero.hasAnimated).toBe(false);

      vi.advanceTimersByTime(100);

      expect(hero.hasAnimated).toBe(true);
    });

    it('should not re-animate if already animated', () => {
      // Prevent duplicate animations
      hero = new Hero(mockData);

      vi.advanceTimersByTime(500);
      expect(hero.hasAnimated).toBe(true);

      const nameElement = document.querySelector('[data-hero-name]');
      const initialClasses = nameElement.className;

      // Try to animate again
      hero.animateIn();

      expect(nameElement.className).toBe(initialClasses);
    });

    it('should handle custom animation delay', () => {
      // Custom animation timing
      hero = new Hero({ ...mockData, animationDelay: 500 });

      const nameElement = document.querySelector('[data-hero-name]');

      vi.advanceTimersByTime(100);
      expect(nameElement.classList.contains('hero__element--visible')).toBe(false);

      vi.advanceTimersByTime(400);
      expect(nameElement.classList.contains('hero__element--visible')).toBe(true);
    });
  });

  describe('Responsive Layout', () => {
    it('should render with center-aligned content', () => {
      // Requirement 5.3: Center-aligned layout
      hero = new Hero(mockData);

      const content = document.querySelector('.hero__content');

      expect(content).toBeTruthy();
      expect(content.parentElement.classList.contains('hero__container')).toBe(true);
    });

    it('should create hero section element if container not provided', () => {
      // Requirement 5.3: Component initialization
      hero = new Hero(mockData);

      const heroSection = document.querySelector('.hero');

      expect(heroSection).toBeTruthy();
      expect(heroSection.tagName).toBe('SECTION');
    });

    it('should use existing container if provided', () => {
      // Custom container usage
      const customSection = document.createElement('section');
      customSection.className = 'custom-hero';
      document.body.appendChild(customSection);

      hero = new Hero({ ...mockData, container: customSection });

      expect(document.querySelector('.custom-hero')).toBeTruthy();
      expect(document.querySelectorAll('section').length).toBe(1);
    });

    it('should render all content within container', () => {
      // Requirement 5.3: Layout structure
      hero = new Hero(mockData);

      const container = document.querySelector('.hero__container');
      const content = container.querySelector('.hero__content');
      const name = content.querySelector('.hero__name');
      const tagline = content.querySelector('.hero__tagline');
      const cta = content.querySelector('.hero__cta-container');

      expect(container).toBeTruthy();
      expect(content).toBeTruthy();
      expect(name).toBeTruthy();
      expect(tagline).toBeTruthy();
      expect(cta).toBeTruthy();
    });
  });

  describe('Update Functionality', () => {
    it('should update hero content when update is called', () => {
      // Dynamic content updates
      hero = new Hero(mockData);

      const newData = {
        name: 'Jane Smith',
        tagline: 'Full Stack Developer',
      };

      hero.update(newData);

      const nameElement = document.querySelector('.hero__name');
      const taglineElement = document.querySelector('.hero__tagline');

      expect(nameElement.textContent.trim()).toBe('Jane Smith');
      expect(taglineElement.textContent.trim()).toBe('Full Stack Developer');
    });

    it('should reset animation state on update', () => {
      // Animation reset on update
      hero = new Hero(mockData);

      vi.advanceTimersByTime(500);
      expect(hero.hasAnimated).toBe(true);

      hero.update({ name: 'New Name' });

      expect(hero.hasAnimated).toBe(false);
    });

    it('should re-trigger animation after update', () => {
      // Re-animation after update
      hero = new Hero(mockData);

      vi.advanceTimersByTime(500);

      hero.update({ name: 'New Name' });

      const nameElement = document.querySelector('[data-hero-name]');
      expect(nameElement.classList.contains('hero__element--hidden')).toBe(true);

      vi.advanceTimersByTime(100);
      expect(nameElement.classList.contains('hero__element--visible')).toBe(true);
    });
  });

  describe('Initialization', () => {
    it('should prepend hero to main element if it exists', () => {
      // Proper DOM insertion
      const main = document.createElement('main');
      document.body.appendChild(main);

      hero = new Hero(mockData);

      expect(main.firstElementChild.classList.contains('hero')).toBe(true);
    });

    it('should prepend hero to body if main does not exist', () => {
      // Fallback DOM insertion
      hero = new Hero(mockData);

      expect(document.body.firstElementChild.classList.contains('hero')).toBe(true);
    });
  });

  describe('Cleanup', () => {
    it('should remove hero element on destroy', () => {
      // Component cleanup
      hero = new Hero(mockData);

      const heroElement = document.querySelector('.hero');
      expect(heroElement).toBeTruthy();

      hero.destroy();

      expect(document.querySelector('.hero')).toBeFalsy();
    });
  });
});
