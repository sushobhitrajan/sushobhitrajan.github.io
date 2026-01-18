/**
 * Main application entry point
 * Initializes all components and sets up the portfolio system
 */

// Import components
import { Navigation } from './components/Navigation.js';
import { Hero } from './components/Hero.js';
import { AboutSection } from './components/AboutSection.js';
import { SkillsSection } from './components/SkillsSection.js';
import { ContactSection } from './components/ContactSection.js';

// Application initialization
console.log('Portfolio System Initialized');

// Initialize Navigation
const navigation = new Navigation({
  links: [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '#about' },
    { id: 'skills', label: 'Skills', path: '#skills' },
    { id: 'experience', label: 'Experience', path: '#experience' },
    { id: 'projects', label: 'Projects', path: '#projects' },
    { id: 'contact', label: 'Contact', path: '#contact' }
  ],
  activeLink: 'home',
  profileImage: null // Will be added later
});

// Update page content
document.getElementById('app').innerHTML = `
  <main>
    <!-- Hero section will be inserted here by the Hero component -->
    <!-- About section will be inserted here by the AboutSection component -->
    <!-- Skills section will be inserted here by the SkillsSection component -->

    <!-- Placeholder sections for testing scroll -->
    <section id="experience" style="min-height: 100vh; padding: var(--space-8) var(--space-4); display: flex; align-items: center; justify-content: center;">
      <div class="container">
        <h2>Experience Section</h2>
        <p>This is a placeholder for the Experience section.</p>
      </div>
    </section>

    <section id="projects" style="min-height: 100vh; padding: var(--space-8) var(--space-4); display: flex; align-items: center; justify-content: center; background: var(--color-background-secondary);">
      <div class="container">
        <h2>Projects Section</h2>
        <p>This is a placeholder for the Projects section.</p>
      </div>
    </section>
  </main>
`;

// Initialize Hero
const hero = new Hero({
  name: 'AI Agents & LLM Engineering',
  tagline: 'Exploring the intersection of Large Language Models, Model Context Protocol, and Autonomous Agent Systems to build intelligent, context-aware applications',
  ctaButtons: [
    { label: 'View Projects', path: '#projects', variant: 'primary' },
    { label: 'Explore Skills', path: '#skills', variant: 'secondary' }
  ]
});

// Initialize About Section
const aboutSection = new AboutSection({});
// Load about data from JSON
aboutSection.loadData('/src/data/about.json').catch(error => {
  console.error('Failed to load about data:', error);
});

// Initialize Skills Section
const skillsSection = new SkillsSection({});
// Load skills data from JSON
skillsSection.loadData('/src/data/skills.json').catch(error => {
  console.error('Failed to load skills data:', error);
});

// Initialize Contact Section
const contactSection = new ContactSection({});
// Load contact data from JSON
contactSection.loadData('/src/data/contact.json').catch(error => {
  console.error('Failed to load contact data:', error);
});

// Show the app once everything is initialized
document.getElementById('app').classList.add('loaded');