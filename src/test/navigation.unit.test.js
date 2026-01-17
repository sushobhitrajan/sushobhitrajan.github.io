/**
 * Unit tests for Navigation component
 * Tests mobile menu toggle, scroll behavior, and active link updates
 * Requirements: 4.1, 4.2, 4.6
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Navigation } from '../components/Navigation.js';

describe('Navigation Component - Unit Tests', () => {
  let navigation;
  let mockLinks;

  beforeEach(() => {
    // Set up DOM
    document.body.innerHTML = '<div id="app"></div>';

    // Mock links data
    mockLinks = [
      { id: 'home', label: 'Home', path: '/' },
      { id: 'projects', label: 'Projects', path: '/projects' },
      { id: 'about', label: 'About', path: '/about' },
    ];

    // Reset scroll position
    window.scrollY = 0;
  });

  afterEach(() => {
    // Clean up
    if (navigation) {
      navigation.destroy();
    }
    document.body.innerHTML = '';
    document.body.style.overflow = '';
  });

  describe('Mobile Menu Toggle', () => {
    it('should toggle mobile menu open when toggle button is clicked', () => {
      // Requirement 4.6: Mobile hamburger menu functionality
      navigation = new Navigation({ links: mockLinks });

      const toggleButton = document.querySelector('[data-mobile-toggle]');
      const menu = document.querySelector('[data-mobile-menu]');

      expect(navigation.isMobileMenuOpen).toBe(false);
      expect(menu.classList.contains('navigation__links--open')).toBe(false);

      // Click toggle button
      toggleButton.click();

      expect(navigation.isMobileMenuOpen).toBe(true);
      expect(menu.classList.contains('navigation__links--open')).toBe(true);
      expect(toggleButton.classList.contains('navigation__toggle--active')).toBe(true);
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
    });

    it('should toggle mobile menu closed when toggle button is clicked again', () => {
      // Requirement 4.6: Mobile hamburger menu functionality
      navigation = new Navigation({ links: mockLinks });

      const toggleButton = document.querySelector('[data-mobile-toggle]');
      const menu = document.querySelector('[data-mobile-menu]');

      // Open menu
      toggleButton.click();
      expect(navigation.isMobileMenuOpen).toBe(true);

      // Close menu
      toggleButton.click();

      expect(navigation.isMobileMenuOpen).toBe(false);
      expect(menu.classList.contains('navigation__links--open')).toBe(false);
      expect(toggleButton.classList.contains('navigation__toggle--active')).toBe(false);
      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('should prevent body scroll when mobile menu is open', () => {
      // Requirement 4.6: Mobile menu behavior
      navigation = new Navigation({ links: mockLinks });

      const toggleButton = document.querySelector('[data-mobile-toggle]');

      // Open menu
      toggleButton.click();
      expect(document.body.style.overflow).toBe('hidden');

      // Close menu
      toggleButton.click();
      expect(document.body.style.overflow).toBe('');
    });

    it('should close mobile menu when clicking outside', () => {
      // Requirement 4.6: Mobile menu behavior
      navigation = new Navigation({ links: mockLinks });

      const toggleButton = document.querySelector('[data-mobile-toggle]');

      // Open menu
      toggleButton.click();
      expect(navigation.isMobileMenuOpen).toBe(true);

      // Click outside navigation
      document.body.click();

      expect(navigation.isMobileMenuOpen).toBe(false);
    });

    it('should close mobile menu when pressing Escape key', () => {
      // Requirement 4.6: Mobile menu behavior
      navigation = new Navigation({ links: mockLinks });

      const toggleButton = document.querySelector('[data-mobile-toggle]');

      // Open menu
      toggleButton.click();
      expect(navigation.isMobileMenuOpen).toBe(true);

      // Press Escape key
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);

      expect(navigation.isMobileMenuOpen).toBe(false);
    });

    it('should close mobile menu when a link is clicked', () => {
      // Requirement 4.6: Mobile menu behavior
      navigation = new Navigation({ links: mockLinks });

      const toggleButton = document.querySelector('[data-mobile-toggle]');
      const firstLink = document.querySelector('.navigation__link');

      // Open menu
      toggleButton.click();
      expect(navigation.isMobileMenuOpen).toBe(true);

      // Click a link
      firstLink.click();

      expect(navigation.isMobileMenuOpen).toBe(false);
    });
  });

  describe('Scroll Behavior', () => {
    it('should add scrolled class when scrolled past threshold', () => {
      // Requirement 4.1: Fixed positioning with backdrop blur
      // Requirement 4.2: Maintain visibility with semi-transparent background
      navigation = new Navigation({ links: mockLinks });

      const navElement = document.querySelector('nav');

      expect(navElement.classList.contains('navigation--scrolled')).toBe(false);

      // Simulate scroll past threshold
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      navigation.handleScroll();

      expect(navElement.classList.contains('navigation--scrolled')).toBe(true);
    });

    it('should remove scrolled class when scrolled back to top', () => {
      // Requirement 4.2: Maintain visibility based on scroll position
      navigation = new Navigation({ links: mockLinks });

      const navElement = document.querySelector('nav');

      // Simulate scroll past threshold
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      navigation.handleScroll();
      expect(navElement.classList.contains('navigation--scrolled')).toBe(true);

      // Scroll back to top
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      navigation.handleScroll();

      expect(navElement.classList.contains('navigation--scrolled')).toBe(false);
    });

    it('should not add scrolled class when scroll is below threshold', () => {
      // Requirement 4.2: Scroll threshold behavior
      navigation = new Navigation({ links: mockLinks });

      const navElement = document.querySelector('nav');

      // Simulate scroll below threshold (default is 50px)
      Object.defineProperty(window, 'scrollY', { value: 30, writable: true });
      navigation.handleScroll();

      expect(navElement.classList.contains('navigation--scrolled')).toBe(false);
    });

    it('should handle scroll event listener correctly', () => {
      // Requirement 4.1: Scroll-based styling updates
      navigation = new Navigation({ links: mockLinks });

      const navElement = document.querySelector('nav');
      const scrollSpy = vi.spyOn(navigation, 'handleScroll');

      // Simulate scroll event
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));

      expect(scrollSpy).toHaveBeenCalled();
    });
  });

  describe('Active Link Updates', () => {
    it('should set active link correctly', () => {
      // Requirement 4.2: Highlight current active page or section
      navigation = new Navigation({ links: mockLinks, activeLink: 'home' });

      const homeLink = document.querySelector('[data-link-id="home"]');
      const projectsLink = document.querySelector('[data-link-id="projects"]');

      expect(homeLink.classList.contains('navigation__link--active')).toBe(true);
      expect(projectsLink.classList.contains('navigation__link--active')).toBe(false);
    });

    it('should update active link when setActive is called', () => {
      // Requirement 4.2: Update active state dynamically
      navigation = new Navigation({ links: mockLinks, activeLink: 'home' });

      const homeLink = document.querySelector('[data-link-id="home"]');
      const projectsLink = document.querySelector('[data-link-id="projects"]');

      expect(homeLink.classList.contains('navigation__link--active')).toBe(true);

      // Change active link
      navigation.setActive('projects');

      expect(homeLink.classList.contains('navigation__link--active')).toBe(false);
      expect(projectsLink.classList.contains('navigation__link--active')).toBe(true);
    });

    it('should remove active class from all links before setting new active link', () => {
      // Requirement 4.2: Only one active link at a time
      navigation = new Navigation({ links: mockLinks, activeLink: 'home' });

      const allLinks = document.querySelectorAll('.navigation__link');

      // Set different link as active
      navigation.setActive('about');

      // Count active links
      const activeLinks = Array.from(allLinks).filter(link =>
        link.classList.contains('navigation__link--active')
      );

      expect(activeLinks.length).toBe(1);
      expect(activeLinks[0].dataset.linkId).toBe('about');
    });

    it('should update active link when a link is clicked', () => {
      // Requirement 4.2: Active link updates on navigation
      navigation = new Navigation({ links: mockLinks, activeLink: 'home' });

      const projectsLink = document.querySelector('[data-link-id="projects"]');

      // Click projects link
      projectsLink.click();

      expect(navigation.activeLink).toBe('projects');
      expect(projectsLink.classList.contains('navigation__link--active')).toBe(true);
    });

    it('should handle setActive with non-existent link ID gracefully', () => {
      // Edge case: Invalid link ID
      navigation = new Navigation({ links: mockLinks, activeLink: 'home' });

      const homeLink = document.querySelector('[data-link-id="home"]');

      // Try to set non-existent link as active
      navigation.setActive('nonexistent');

      // Home link should no longer be active, but no error should occur
      expect(homeLink.classList.contains('navigation__link--active')).toBe(false);
      expect(navigation.activeLink).toBe('nonexistent');
    });
  });

  describe('Rendering', () => {
    it('should render navigation with links', () => {
      // Requirement 4.1: Navigation component rendering
      navigation = new Navigation({ links: mockLinks });

      const navElement = document.querySelector('nav');
      const links = document.querySelectorAll('.navigation__link');

      expect(navElement).toBeTruthy();
      expect(links.length).toBe(3);
    });

    it('should render profile image when provided', () => {
      // Requirement 4.1: Profile image/avatar
      navigation = new Navigation({
        links: mockLinks,
        profileImage: '/images/profile.jpg',
      });

      const profileLink = document.querySelector('.navigation__profile');
      const profileImage = document.querySelector('.navigation__profile-image');

      expect(profileLink).toBeTruthy();
      expect(profileImage).toBeTruthy();
      expect(profileImage.src).toContain('/images/profile.jpg');
    });

    it('should not render profile section when no image is provided', () => {
      // Edge case: No profile image
      navigation = new Navigation({ links: mockLinks });

      const profileLink = document.querySelector('.navigation__profile');

      expect(profileLink).toBeFalsy();
    });

    it('should render mobile toggle button', () => {
      // Requirement 4.6: Mobile hamburger menu
      navigation = new Navigation({ links: mockLinks });

      const toggleButton = document.querySelector('[data-mobile-toggle]');

      expect(toggleButton).toBeTruthy();
      expect(toggleButton.getAttribute('aria-label')).toBe('Toggle menu');
      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('Initialization', () => {
    it('should create navigation container if not provided', () => {
      // Requirement 4.1: Component initialization
      navigation = new Navigation({ links: mockLinks });

      const navElement = document.querySelector('nav');

      expect(navElement).toBeTruthy();
      expect(navElement.classList.contains('navigation')).toBe(true);
    });

    it('should use existing container if provided', () => {
      // Custom container usage
      const customNav = document.createElement('nav');
      customNav.id = 'custom-nav';
      document.body.appendChild(customNav);

      navigation = new Navigation({ container: customNav, links: mockLinks });

      expect(document.querySelector('#custom-nav')).toBeTruthy();
      expect(document.querySelectorAll('nav').length).toBe(1);
    });

    it('should call handleScroll on initialization', () => {
      // Requirement 4.2: Initial scroll state check
      const scrollSpy = vi.spyOn(Navigation.prototype, 'handleScroll');

      navigation = new Navigation({ links: mockLinks });

      expect(scrollSpy).toHaveBeenCalled();

      scrollSpy.mockRestore();
    });
  });
});
