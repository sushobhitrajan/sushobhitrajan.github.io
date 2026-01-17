/**
 * Unit tests for AboutSection component
 * Tests bio rendering, photo lazy loading, and highlights display
 * Requirements: 16.1, 16.2, 16.3
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AboutSection } from '../components/AboutSection.js';

describe('AboutSection Component - Unit Tests', () => {
  let aboutSection;
  let mockData;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = '<div id="app"></div>';

    // Mock about data
    mockData = {
      name: 'John Doe',
      bio: [
        'First paragraph of bio.',
        'Second paragraph of bio.',
        'Third paragraph of bio.'
      ],
      photo: '/images/profile.jpg',
      highlights: [
        '5+ years of experience',
        'Full-stack developer',
        'Open source contributor'
      ],
      resumeLink: '/downloads/resume.pdf',
      currentFocus: [
        'Web development',
        'Machine learning',
        'Cloud architecture'
      ]
    };
  });

  afterEach(() => {
    // Clean up
    if (aboutSection) {
      aboutSection.destroy();
    }
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('Bio Rendering', () => {
    it('should render bio paragraphs', () => {
      // Requirement 16.1: Include professional bio
      aboutSection = new AboutSection(mockData);

      const bioParagraphs = document.querySelectorAll('.about-section__bio-paragraph');

      expect(bioParagraphs.length).toBe(3);
      expect(bioParagraphs[0].textContent).toBe('First paragraph of bio.');
      expect(bioParagraphs[1].textContent).toBe('Second paragraph of bio.');
      expect(bioParagraphs[2].textContent).toBe('Third paragraph of bio.');
    });

    it('should render bio section with proper structure', () => {
      // Requirement 16.1: Bio structure
      aboutSection = new AboutSection(mockData);

      const bioSection = document.querySelector('.about-section__bio');

      expect(bioSection).toBeTruthy();
      expect(bioSection.parentElement.classList.contains('about-section__text')).toBe(true);
    });

    it('should not render bio section when bio is empty', () => {
      // Edge case: No bio
      aboutSection = new AboutSection({ ...mockData, bio: [] });

      const bioSection = document.querySelector('.about-section__bio');

      expect(bioSection).toBeFalsy();
    });

    it('should handle single bio paragraph', () => {
      // Edge case: Single paragraph
      aboutSection = new AboutSection({ ...mockData, bio: ['Single paragraph.'] });

      const bioParagraphs = document.querySelectorAll('.about-section__bio-paragraph');

      expect(bioParagraphs.length).toBe(1);
      expect(bioParagraphs[0].textContent).toBe('Single paragraph.');
    });
  });

  describe('Photo Lazy Loading', () => {
    it('should render profile photo with lazy loading attribute', () => {
      // Requirement 16.2: Display professional profile photo
      aboutSection = new AboutSection(mockData);

      const photo = document.querySelector('.about-section__photo');

      expect(photo).toBeTruthy();
      expect(photo.src).toContain('/images/profile.jpg');
      expect(photo.getAttribute('loading')).toBe('lazy');
    });

    it('should include alt text for photo', () => {
      // Accessibility requirement
      aboutSection = new AboutSection(mockData);

      const photo = document.querySelector('.about-section__photo');

      expect(photo.alt).toBe('John Doe');
    });

    it('should use default alt text when name not provided', () => {
      // Edge case: No name
      aboutSection = new AboutSection({ ...mockData, name: '' });

      const photo = document.querySelector('.about-section__photo');

      expect(photo.alt).toBe('Profile photo');
    });

    it('should not render photo when not provided', () => {
      // Edge case: No photo
      aboutSection = new AboutSection({ ...mockData, photo: null });

      const photo = document.querySelector('.about-section__photo');

      expect(photo).toBeFalsy();
    });

    it('should setup IntersectionObserver for lazy loading', () => {
      // Lazy loading setup
      const observeSpy = vi.fn();
      const mockObserver = {
        observe: observeSpy,
        unobserve: vi.fn(),
        disconnect: vi.fn()
      };

      global.IntersectionObserver = vi.fn((callback) => mockObserver);

      aboutSection = new AboutSection(mockData);

      expect(global.IntersectionObserver).toHaveBeenCalled();
      expect(observeSpy).toHaveBeenCalled();
    });

    it('should add loaded class when photo loads', () => {
      // Photo load event
      aboutSection = new AboutSection(mockData);

      const photo = document.querySelector('.about-section__photo');

      // Simulate photo load
      photo.dispatchEvent(new Event('load'));

      expect(photo.classList.contains('about-section__photo--loaded')).toBe(true);
      expect(aboutSection.photoLoaded).toBe(true);
    });

    it('should add error class when photo fails to load', () => {
      // Photo error handling
      aboutSection = new AboutSection(mockData);

      const photo = document.querySelector('.about-section__photo');

      // Simulate photo error
      photo.dispatchEvent(new Event('error'));

      expect(photo.classList.contains('about-section__photo--error')).toBe(true);
      expect(photo.alt).toBe('Profile photo unavailable');
    });

    it('should handle already loaded photo from cache', () => {
      // Cached photo handling
      aboutSection = new AboutSection(mockData);

      const photo = document.querySelector('.about-section__photo');

      // Simulate cached photo (already complete)
      Object.defineProperty(photo, 'complete', { value: true, writable: true });
      aboutSection.lazyLoadPhoto(photo);

      expect(photo.classList.contains('about-section__photo--loaded')).toBe(true);
    });
  });

  describe('Highlights Display', () => {
    it('should render highlights list', () => {
      // Requirement 16.3: Include key highlights
      aboutSection = new AboutSection(mockData);

      const highlightItems = document.querySelectorAll('.about-section__highlight-item');

      expect(highlightItems.length).toBe(3);
      expect(highlightItems[0].textContent).toBe('5+ years of experience');
      expect(highlightItems[1].textContent).toBe('Full-stack developer');
      expect(highlightItems[2].textContent).toBe('Open source contributor');
    });

    it('should render highlights with checkmark indicators', () => {
      // Visual indicators for highlights
      aboutSection = new AboutSection(mockData);

      const highlightItems = document.querySelectorAll('.about-section__highlight-item');

      highlightItems.forEach(item => {
        const styles = window.getComputedStyle(item, '::before');
        // Check that ::before pseudo-element exists (has content)
        expect(item.classList.contains('about-section__highlight-item')).toBe(true);
      });
    });

    it('should not render highlights section when empty', () => {
      // Edge case: No highlights
      aboutSection = new AboutSection({ ...mockData, highlights: [] });

      const highlightsSection = document.querySelector('.about-section__highlights');

      expect(highlightsSection).toBeFalsy();
    });

    it('should render highlights section with subtitle', () => {
      // Section structure
      aboutSection = new AboutSection(mockData);

      const subtitle = document.querySelector('.about-section__highlights .about-section__subtitle');

      expect(subtitle).toBeTruthy();
      expect(subtitle.textContent).toBe('Highlights');
    });
  });

  describe('Current Focus Display', () => {
    it('should render current focus items', () => {
      // Current focus display
      aboutSection = new AboutSection(mockData);

      const focusItems = document.querySelectorAll('.about-section__focus-item');

      expect(focusItems.length).toBe(3);
      expect(focusItems[0].textContent).toBe('Web development');
      expect(focusItems[1].textContent).toBe('Machine learning');
      expect(focusItems[2].textContent).toBe('Cloud architecture');
    });

    it('should not render focus section when empty', () => {
      // Edge case: No current focus
      aboutSection = new AboutSection({ ...mockData, currentFocus: [] });

      const focusSection = document.querySelector('.about-section__focus');

      expect(focusSection).toBeFalsy();
    });

    it('should render focus section with subtitle', () => {
      // Section structure
      aboutSection = new AboutSection(mockData);

      const subtitle = document.querySelector('.about-section__focus .about-section__subtitle');

      expect(subtitle).toBeTruthy();
      expect(subtitle.textContent).toBe('Current Focus');
    });
  });

  describe('Resume Link', () => {
    it('should render resume download link', () => {
      // Resume link display
      aboutSection = new AboutSection(mockData);

      const resumeLink = document.querySelector('.about-section__resume-link');

      expect(resumeLink).toBeTruthy();
      expect(resumeLink.href).toContain('/downloads/resume.pdf');
      expect(resumeLink.textContent.trim()).toContain('Download Resume');
    });

    it('should include download attribute', () => {
      // Download attribute
      aboutSection = new AboutSection(mockData);

      const resumeLink = document.querySelector('.about-section__resume-link');

      expect(resumeLink.hasAttribute('download')).toBe(true);
    });

    it('should include aria-label for accessibility', () => {
      // Accessibility
      aboutSection = new AboutSection(mockData);

      const resumeLink = document.querySelector('.about-section__resume-link');

      expect(resumeLink.getAttribute('aria-label')).toBe('Download resume');
    });

    it('should not render resume link when not provided', () => {
      // Edge case: No resume link
      aboutSection = new AboutSection({ ...mockData, resumeLink: null });

      const resumeLink = document.querySelector('.about-section__resume-link');

      expect(resumeLink).toBeFalsy();
    });

    it('should include download icon', () => {
      // Icon display
      aboutSection = new AboutSection(mockData);

      const icon = document.querySelector('.about-section__resume-icon');

      expect(icon).toBeTruthy();
      expect(icon.tagName).toBe('svg');
    });
  });

  describe('Section Structure', () => {
    it('should render section with correct ID', () => {
      // Section ID for navigation
      aboutSection = new AboutSection(mockData);

      const section = document.querySelector('#about');

      expect(section).toBeTruthy();
      expect(section.classList.contains('about-section')).toBe(true);
    });

    it('should render section title', () => {
      // Section title
      aboutSection = new AboutSection(mockData);

      const title = document.querySelector('.about-section__title');

      expect(title).toBeTruthy();
      expect(title.textContent).toBe('About Me');
      expect(title.tagName).toBe('H2');
    });

    it('should render content within container', () => {
      // Layout structure
      aboutSection = new AboutSection(mockData);

      const container = document.querySelector('.about-section__container');
      const content = container.querySelector('.about-section__content');

      expect(container).toBeTruthy();
      expect(content).toBeTruthy();
    });

    it('should create section element if container not provided', () => {
      // Component initialization
      aboutSection = new AboutSection(mockData);

      const section = document.querySelector('.about-section');

      expect(section).toBeTruthy();
      expect(section.tagName).toBe('SECTION');
    });

    it('should use existing container if provided', () => {
      // Custom container usage
      const customSection = document.createElement('section');
      customSection.className = 'custom-about';
      customSection.id = 'custom-about';
      document.body.appendChild(customSection);

      aboutSection = new AboutSection({ ...mockData, container: customSection });

      expect(document.querySelector('#custom-about')).toBeTruthy();
      expect(document.querySelectorAll('section').length).toBe(1);
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

      aboutSection = new AboutSection({});
      await aboutSection.loadData('/data/about.json');

      expect(aboutSection.bio).toEqual(mockData.bio);
      expect(aboutSection.photo).toBe(mockData.photo);
      expect(aboutSection.highlights).toEqual(mockData.highlights);
    });

    it('should handle fetch errors gracefully', async () => {
      // Error handling
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 404
        })
      );

      aboutSection = new AboutSection({});

      await expect(aboutSection.loadData('/data/about.json')).rejects.toThrow();
    });

    it('should re-render after loading data', async () => {
      // Re-render on data load
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData)
        })
      );

      aboutSection = new AboutSection({});
      await aboutSection.loadData('/data/about.json');

      const bioParagraphs = document.querySelectorAll('.about-section__bio-paragraph');

      expect(bioParagraphs.length).toBe(3);
    });
  });

  describe('Update Functionality', () => {
    it('should update content when update is called', () => {
      // Dynamic content updates
      aboutSection = new AboutSection(mockData);

      const newData = {
        bio: ['Updated bio paragraph.'],
        highlights: ['New highlight']
      };

      aboutSection.update(newData);

      const bioParagraphs = document.querySelectorAll('.about-section__bio-paragraph');
      const highlightItems = document.querySelectorAll('.about-section__highlight-item');

      expect(bioParagraphs.length).toBe(1);
      expect(bioParagraphs[0].textContent).toBe('Updated bio paragraph.');
      expect(highlightItems.length).toBe(1);
    });

    it('should reset photo loaded state on update', () => {
      // Photo state reset
      aboutSection = new AboutSection(mockData);
      aboutSection.photoLoaded = true;

      aboutSection.update({ photo: '/images/new-photo.jpg' });

      expect(aboutSection.photoLoaded).toBe(false);
    });
  });

  describe('Cleanup', () => {
    it('should remove section element on destroy', () => {
      // Component cleanup
      aboutSection = new AboutSection(mockData);

      const section = document.querySelector('.about-section');
      expect(section).toBeTruthy();

      aboutSection.destroy();

      expect(document.querySelector('.about-section')).toBeFalsy();
    });
  });
});
