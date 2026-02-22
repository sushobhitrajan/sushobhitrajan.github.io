/**
 * Main application entry point
 * Initializes all components and sets up the portfolio system
 */

// Import components
import { Navigation } from './components/Navigation.js';
import { Hero } from './components/Hero.js';
import { InfoWidgets } from './components/InfoWidgets.js';
import { AboutSection } from './components/AboutSection.js';
import { SkillsSection } from './components/SkillsSection.js';
import { ExperienceSection } from './components/ExperienceSection.js';
import { ConnectSection } from './components/ConnectSection.js';
import { ContactSection } from './components/ContactSection.js';
import { BackgroundAnimation } from './components/BackgroundAnimation.js';
import { WelcomeWidget } from './components/WelcomeWidget.js';

// Application initialization
console.log('Portfolio System Initialized');

// Initialize Welcome Widget
new WelcomeWidget();

// Initialize Navigation
const navigation = new Navigation({
  links: [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'skills', label: 'Hands-On', path: '#skills' },
    { id: 'tech-topics', label: 'Tech Topics', path: '/technical-topics.html' },
    { id: 'connect', label: 'Mentorship', path: '#connect' },
    { id: 'about', label: 'About', path: '#about' },
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
    <!-- Experience section will be inserted here by the ExperienceSection component -->
    <!-- Connect section will be inserted here by the ConnectSection component -->
    <div id="connect-section-container"></div>
  </main>
`;

// Initialize Hero
const hero = new Hero({
  name: 'AI Agents & LLM Engineering',
  tagline: 'Building the next generation of intelligent systems through Large Language Models, Model Context Protocol, and autonomous agent architectures. Transforming how AI interacts with tools, data, and users.',
  ctaButtons: [
    { label: '→ View Projects', path: '#projects', variant: 'primary' },
    { label: 'Explore Expertise', path: '#skills', variant: 'secondary' }
  ]
});

// Initialize Info Widgets
const infoWidgets = new InfoWidgets({});

// Initialize Skills Section
const skillsSection = new SkillsSection({});
// Load skills data from JSON
skillsSection.loadData('/src/data/skills.json').catch(error => {
  console.error('Failed to load skills data:', error);
});

// Initialize Connect Section (Mentorship) - comes before About
const connectSection = new ConnectSection();
connectSection.init().catch(error => {
  console.error('Failed to initialize connect section:', error);
});

// Initialize About Section
const aboutSection = new AboutSection({});
// Append to main
document.querySelector('main').appendChild(aboutSection.container);
// Load about data from JSON
aboutSection.loadData('/src/data/about.json').catch(error => {
  console.error('Failed to load about data:', error);
});

// Initialize Contact Section
const contactSection = new ContactSection({});
// Load contact data from JSON
contactSection.loadData('/src/data/contact.json').catch(error => {
  console.error('Failed to load contact data:', error);
});

// Initialize Background Animation
const backgroundAnimation = new BackgroundAnimation({
  particleCount: 84, // +10% more (was 76)
  connectionDistance: 150
});

// Show the app once everything is initialized
document.getElementById('app').classList.add('loaded');

// Handle hash navigation after everything is loaded
// This ensures the page scrolls to the correct section on refresh
setTimeout(() => {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}, 100); // Small delay to ensure all sections are rendered