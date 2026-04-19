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
    <div class="article-container">
      <a href="/technical-topics.html" class="back-btn">&larr; Back to Topics</a>
      
      <header class="article-header">
        <h1 style="background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Beyond the IDE: A Community Shift Toward Agentic Engineering</h1>
        <p class="lead" style="font-size: 1.3rem; color: var(--color-text-secondary); margin-bottom: 2.5rem; line-height: 1.6;">
          As developers, we’ve spent decades perfecting our typing speed and IDE shortcuts. But we’re entering an era where the bottleneck isn't how fast we can write code—it's how clearly we can define the problem. Here is how I transformed my workflow, and why I believe this is the path for our community to unblock the world's most complex problems.
        </p>
      </header>

      <section class="article-section">
        <h2>Chapter 1: The Death of the "Manual Loop"</h2>
        <p>We've all been there: a 40-hour work week where 30 hours are spent on boilerplate, debugging typos, and chasing dependency hell. This "Manual Loop" is where creativity goes to die. By integrating agents like <strong>AWS Kiro</strong>, I’ve broken that loop.</p>
        
        <div class="diagram-container" style="background: var(--color-background-secondary); padding: 2rem; border-radius: var(--radius-lg); margin: 2rem 0;">
          <div class="mermaid">
          graph TD
              subgraph "The Legacy Manual Loop"
                  L1[Requirement] --> L2[Manual Implementation]
                  L2 --> L3[Syntax Debugging]
                  L3 --> L4[Manual Testing]
                  L4 --> L2
              end
              
              subgraph "The Modern Agentic Loop"
                  M1[Clear Spec] --> M2[Agent Orchestration]
                  M2 --> M3[System Validation]
                  M3 --> M4[Rapid Iteration]
                  M4 --> M1
              end
              
              style L2 fill:#fee2e2,stroke:#ef4444
              style M2 fill:#dcfce7,stroke:#22c55e
          </div>
        </div>
        <p>The shift isn't just about speed; it's about <strong>organization</strong>. When you use agents, you are forced to be more organized. You can't give an agent a vague idea; you have to give it a solid specification.</p>
      </section>

      <section class="article-section">
        <h2>Chapter 2: Unblocking Complexity with AWS Kiro</h2>
        <p>The real magic happens when you hit a wall. We’ve all faced those architectural puzzles that feel too big for one brain. This is where <strong>AWS Kiro (CLI & Chat Panel)</strong> becomes more than a tool—it becomes a force multiplier.</p>
        
        <p>In my experience, using Kiro allows me to:</p>
        <ul>
          <li><strong>Offload Cognitive Load:</strong> Let the agent handle the "how" (implementation details) while I focus on the "what" (business logic and architecture).</li>
          <li><strong>Spec-Driven Development:</strong> By treating my Markdown specs as the "source of truth," I create a deterministic path for the agent to follow. This eliminates the "hallucination" problem and ensures the output matches the vision.</li>
        </ul>
      </section>

      <section class="article-section">
        <h2>Chapter 3: Connecting the Community</h2>
        <p>This isn't just my story—it's where we are all headed. The potential for our community to unblock complex problems is higher than ever. When we stop fighting the syntax, we start solving the <strong>real</strong> problems: low-latency pipelines, distributed systems, and truly intelligent AI agents.</p>

        <div class="diagram-container" style="background: var(--color-background-secondary); padding: 2rem; border-radius: var(--radius-lg); margin: 2rem 0;">
          <div class="mermaid">
          graph LR
              C1[Community Experience] --> C2{Agentic Workflow}
              C2 --> C3[Complexity Unblocked]
              C2 --> C4[Speed Multiplied]
              C2 --> C5[Organized Scale]
              
              style C2 fill:var(--color-accent),color:#fff
          </div>
        </div>

        <p>Let's share this experience. The transition from "writing code" to "orchestrating value" is the most empowering shift an SDE can make. It’s faster, it’s more organized, and frankly, it makes engineering fun again.</p>
      </section>

      <footer class="article-footer" style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--color-border);">
        <p><em>Let's build the future together. If you're experimenting with agentic workflows or AWS Kiro, reach out—I'd love to swap notes.</em></p>
      </footer>
    </div>
  </main>
`;


const backgroundAnimation = new BackgroundAnimation({
  particleCount: 60,
  connectionDistance: 150
});

// Load Mermaid to render the diagrams
const script = document.createElement('script');
script.type = 'module';
script.innerHTML = `
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ 
  startOnLoad: true, 
  theme: 'neutral',
  fontFamily: 'Inter, sans-serif',
  themeVariables: {
    primaryColor: '#3b82f6',
    edgeColor: '#64748b'
  }
});
mermaid.init(undefined, document.querySelectorAll('.mermaid'));
`;
document.body.appendChild(script);

document.getElementById('app').classList.add('loaded');
