/**
 * Main application entry point
 * Initializes all components and sets up the portfolio system
 */

// Import styles
import './styles/main.css';

// Import components
import { Navigation } from './components/Navigation.js';

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
  <main class="container" style="padding-top: 120px;">
    <h1>Sushobhit Rajan</h1>
    <p class="text-secondary">Software Engineering & Machine Learning</p>
    <p style="margin-top: var(--space-4);">Navigation component is now active! Try scrolling to see the backdrop blur effect.</p>
    <p>On mobile (< 768px), you'll see a hamburger menu.</p>

    <div style="height: 200vh; margin-top: var(--space-8);">
      <p>Scroll down to test the navigation scroll effect...</p>
    </div>
  </main>
`;

