/**
 * Main application entry point
 * Initializes all components and sets up the portfolio system
 */

// Import styles
import './styles/main.css';

// Import components
import { Navigation } from './components/Navigation.js';
import { Hero } from './components/Hero.js';

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

    <!-- Placeholder sections for testing scroll -->
    <section id="about" style="min-height: 100vh; padding: var(--space-8) var(--space-4); display: flex; align-items: center; justify-content: center;">
      <div class="container">
        <h2>About Section</h2>
        <p>This is a placeholder for the About section.</p>
      </div>
    </section>

    <section id="skills" style="min-height: 100vh; padding: var(--space-8) var(--space-4); display: flex; align-items: center; justify-content: center; background: var(--color-background-secondary);">
      <div class="container">
        <h2>Skills Section</h2>
        <p>This is a placeholder for the Skills section.</p>
      </div>
    </section>

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

    <section id="contact" style="min-height: 100vh; padding: var(--space-8) var(--space-4); display: flex; align-items: center; justify-content: center;">
      <div class="container">
        <h2>Contact Section</h2>
        <p>This is a placeholder for the Contact section.</p>
      </div>
    </section>
  </main>
`;

// Initialize Hero
const hero = new Hero({
  name: 'Sushobhit Rajan',
  tagline: 'Software Engineering & Machine Learning',
  ctaButtons: [
    { label: 'View Projects', path: '#projects', variant: 'primary' },
    { label: 'Contact Me', path: '#contact', variant: 'secondary' }
  ]
});

