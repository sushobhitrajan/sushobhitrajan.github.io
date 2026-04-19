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
      
      <h1 style="background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">From Writing Code to Orchestrating Agents</h1>
      
      <p class="lead" style="font-size: 1.4rem; color: var(--color-text-secondary); margin-bottom: 2rem; line-height: 1.6;">
        I used to spend my days staring at a cursor, manually typing out every function and debugging every typo. Today, my SDE dev cycle looks completely different. I've shifted from <em>writing code</em> to <em>getting things done</em> through autonomous agents.
      </p>

      <div class="highlight-box" style="background: var(--color-background-secondary); border-left: 4px solid var(--color-accent); padding: 2rem; border-radius: var(--radius-md); margin-bottom: 3rem;">
        <p style="margin-bottom: 0; font-style: italic;">"The goal isn't to write more code. The goal is to solve the problem. Agents are just the most efficient way I've found to bridge that gap."</p>
      </div>

      <h2>The Catalyst: AWS Kiro (CLI & Chat Panel)</h2>
      <p>My daily driver shifted when I started leaning heavily into <strong>AWS Kiro</strong>. It's not just another autocomplete tool; it's a co-pilot that actually understands the context of the entire project.</p>
      
      <ul>
        <li><strong>AWS Kiro CLI:</strong> I use this for the heavy lifting—refactoring entire directories, running test suites, and generating boilerplate based on complex prompts. It feels like having a senior engineer who never sleeps.</li>
        <li><strong>Chat Panel:</strong> This is where I brainstorm. I'll describe a high-level architectural problem, and Kiro helps me iterate on the design before a single file is even touched.</li>
      </ul>

      <h2>The Framework: Spec-Driven Development</h2>
      <p>This is the most important part of the transformation. I don't start with code anymore. I start with <strong>Specs</strong>.</p>
      
      <p>By writing a comprehensive Markdown spec first (just like the ones we use for OrcaVoz), I provide a source of truth for the agents. When the spec is solid, the agent doesn't have to guess. It has the blueprint. I've moved from "guessing and checking" to "defining and generating."</p>

      <div class="diagram-container" style="margin: 3rem 0; padding: 2rem; background: var(--color-background-secondary); border-radius: var(--radius-lg); text-align: center;">
        <div class="mermaid">
        graph LR
            A[Draft Spec] --> B[Review with Kiro Chat]
            B --> C[Finalize Requirements]
            C --> D[Agent Generates Code]
            D --> E[Validate & Deploy]
            
            style C fill:var(--color-accent),color:#fff
        </div>
      </div>

      <h2>The Result: A 10x Shift in Output</h2>
      <p>Since making this shift, my dev cycles have compressed. What used to take a week of manual implementation now takes an afternoon of spec-writing and agent orchestration. It allows me to stay in the "architecture zone" longer, focusing on the <em>why</em> and the <em>how</em> rather than getting bogged down in the syntax.</p>
      
      <p>If you're still writing every line by hand, you're missing out on the most exciting shift in engineering history. It's time to stop being a coder and start being an architect of agents.</p>
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
