/**
 * Property-Based Tests for Navigation Component
 * Feature: developer-portfolio-redesign
 */

import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { Navigation } from '../components/Navigation.js';

/**
 * Helper function to create mock navigation links
 */
function createMockLinks(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `link-${i}`,
    label: `Link ${i}`,
    path: `/page-${i}`,
    external: false,
  }));
}

/**
 * Helper function to count active links in the DOM
 */
function countActiveLinks(container) {
  const activeLinks = container.querySelectorAll('.navigation__link--active');
  return activeLinks.length;
}

/**
 * Helper function to get the active link ID
 */
function getActiveLinkId(container) {
  const activeLink = container.querySelector('.navigation__link--active');
  return activeLink ? activeLink.dataset.linkId : null;
}

describe('Navigation Component Property Tests', () => {
  let container;
  let navigation;

  beforeEach(() => {
    // Create a fresh container for each test
    container = document.createElement('nav');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up after each test
    if (navigation) {
      navigation.destroy();
      navigation = null;
    }
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  // Feature: developer-portfolio-redesign, Property 8: Navigation Active State
  // Validates: Requirements 4.3
  test('Property 8: Exactly one navigation link has active state at any time', () => {
    fc.assert(
      fc.property(
        // Generate random number of links (2-10)
        fc.integer({ min: 2, max: 10 }),
        // Generate random active link index
        fc.integer({ min: 0, max: 9 }),
        (linkCount, activeLinkIndex) => {
          // Ensure activeLinkIndex is within bounds
          const safeActiveLinkIndex = activeLinkIndex % linkCount;

          // Create mock links
          const links = createMockLinks(linkCount);
          const activeLinkId = links[safeActiveLinkIndex].id;

          // Create navigation with active link
          navigation = new Navigation({
            container,
            links,
            activeLink: activeLinkId,
          });

          // Verify exactly one link has active class
          const activeCount = countActiveLinks(container);
          expect(activeCount).toBe(1);

          // Verify the correct link is active
          const currentActiveLinkId = getActiveLinkId(container);
          expect(currentActiveLinkId).toBe(activeLinkId);

          // Clean up for next iteration
          navigation.destroy();
          navigation = null;
          container.innerHTML = '';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: developer-portfolio-redesign, Property 8: Navigation Active State
  // Validates: Requirements 4.3
  test('Property 8: Setting active link updates state correctly', () => {
    fc.assert(
      fc.property(
        // Generate random number of links (2-10)
        fc.integer({ min: 2, max: 10 }),
        // Generate two different link indices
        fc.integer({ min: 0, max: 9 }),
        fc.integer({ min: 0, max: 9 }),
        (linkCount, initialIndex, newIndex) => {
          // Ensure indices are within bounds and different
          const safeInitialIndex = initialIndex % linkCount;
          const safeNewIndex = newIndex % linkCount;

          // Create mock links
          const links = createMockLinks(linkCount);
          const initialActiveLinkId = links[safeInitialIndex].id;
          const newActiveLinkId = links[safeNewIndex].id;

          // Create navigation with initial active link
          navigation = new Navigation({
            container,
            links,
            activeLink: initialActiveLinkId,
          });

          // Verify initial state
          expect(countActiveLinks(container)).toBe(1);
          expect(getActiveLinkId(container)).toBe(initialActiveLinkId);

          // Change active link
          navigation.setActive(newActiveLinkId);

          // Verify exactly one link is still active
          expect(countActiveLinks(container)).toBe(1);

          // Verify the new link is active
          expect(getActiveLinkId(container)).toBe(newActiveLinkId);

          // Verify the old link is no longer active
          const oldLink = container.querySelector(`[data-link-id="${initialActiveLinkId}"]`);
          if (oldLink && initialActiveLinkId !== newActiveLinkId) {
            expect(oldLink.classList.contains('navigation__link--active')).toBe(false);
          }

          // Clean up for next iteration
          navigation.destroy();
          navigation = null;
          container.innerHTML = '';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: developer-portfolio-redesign, Property 8: Navigation Active State
  // Validates: Requirements 4.3
  test('Property 8: Multiple setActive calls maintain single active state', () => {
    fc.assert(
      fc.property(
        // Generate random number of links (3-8)
        fc.integer({ min: 3, max: 8 }),
        // Generate array of link indices to activate in sequence
        fc.array(fc.integer({ min: 0, max: 7 }), { minLength: 2, maxLength: 5 }),
        (linkCount, activationSequence) => {
          // Create mock links
          const links = createMockLinks(linkCount);

          // Create navigation with no initial active link
          navigation = new Navigation({
            container,
            links,
            activeLink: null,
          });

          // Apply each activation in sequence
          activationSequence.forEach((index) => {
            const safeIndex = index % linkCount;
            const linkId = links[safeIndex].id;

            navigation.setActive(linkId);

            // After each setActive, verify exactly one link is active
            expect(countActiveLinks(container)).toBe(1);
            expect(getActiveLinkId(container)).toBe(linkId);
          });

          // Clean up for next iteration
          navigation.destroy();
          navigation = null;
          container.innerHTML = '';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: developer-portfolio-redesign, Property 8: Navigation Active State
  // Validates: Requirements 4.3
  test('Property 8: Navigation with no active link has zero active states', () => {
    fc.assert(
      fc.property(
        // Generate random number of links (2-10)
        fc.integer({ min: 2, max: 10 }),
        (linkCount) => {
          // Create mock links
          const links = createMockLinks(linkCount);

          // Create navigation with no active link
          navigation = new Navigation({
            container,
            links,
            activeLink: null,
          });

          // Verify no links have active class
          const activeCount = countActiveLinks(container);
          expect(activeCount).toBe(0);

          // Verify getActiveLinkId returns null
          expect(getActiveLinkId(container)).toBeNull();

          // Clean up for next iteration
          navigation.destroy();
          navigation = null;
          container.innerHTML = '';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: developer-portfolio-redesign, Property 8: Navigation Active State
  // Validates: Requirements 4.3
  test('Property 8: Setting active to invalid link ID maintains zero active states', () => {
    fc.assert(
      fc.property(
        // Generate random number of links (2-10)
        fc.integer({ min: 2, max: 10 }),
        // Generate random invalid link ID
        fc.string({ minLength: 5, maxLength: 20 }),
        (linkCount, invalidLinkId) => {
          // Create mock links
          const links = createMockLinks(linkCount);

          // Ensure invalidLinkId doesn't match any real link IDs
          const validLinkIds = links.map(link => link.id);
          if (validLinkIds.includes(invalidLinkId)) {
            return; // Skip this iteration if by chance we generated a valid ID
          }

          // Create navigation with no active link
          navigation = new Navigation({
            container,
            links,
            activeLink: null,
          });

          // Try to set an invalid link as active
          navigation.setActive(invalidLinkId);

          // Verify no links have active class (invalid ID should not activate anything)
          const activeCount = countActiveLinks(container);
          expect(activeCount).toBe(0);

          // Clean up for next iteration
          navigation.destroy();
          navigation = null;
          container.innerHTML = '';
        }
      ),
      { numRuns: 100 }
    );
  });
});
