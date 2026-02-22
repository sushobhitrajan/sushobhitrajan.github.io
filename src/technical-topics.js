import { Navigation } from './components/Navigation.js';
import { BackgroundAnimation } from './components/BackgroundAnimation.js';

const links = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'skills', label: 'Hands-On', path: '/#skills' },
  { id: 'tech-topics', label: 'Tech Topics', path: '/technical-topics.html' },
  { id: 'connect', label: 'Mentorship', path: '/#connect' },
  { id: 'about', label: 'About Me', path: '/#about' },
  { id: 'contact', label: 'Contact', path: '/#contact' }
];

const navigation = new Navigation({
  links: links,
  activeLink: 'tech-topics'
});

document.getElementById('app').innerHTML = `
  <main class="page-wrapper container">
    <div class="topic-list">
      <h1 style="margin-bottom: 2rem; font-size: 2.2rem; text-align: center; background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Technical Topics</h1>
      <p style="text-align: center; margin-bottom: 4rem; font-size: 1.2rem; color: var(--color-text-muted);">
        In-depth explorations of architecture, tooling, and engineering problems.
      </p>

      <div class="topic-card">
        <h2>Why MCP? (The "N &times; M" Problem)</h2>
        <p>A breakdown of the fragmentation problem in modern AI integrations and how the Model Context Protocol acts as a universal USB port to solve the N &times; M complexity explosion.</p>
        <a href="/topics/why-mcp.html">Read Article &rarr;</a>
      </div>
      
      <!-- More topics can be added here -->
    </div>
  </main>
`;

const backgroundAnimation = new BackgroundAnimation({
  particleCount: 50,
  connectionDistance: 150
});

document.getElementById('app').classList.add('loaded');
