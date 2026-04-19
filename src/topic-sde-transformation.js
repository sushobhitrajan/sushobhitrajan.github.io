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
        <h1 style="background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">My Journey from Coder to Agent Orchestrator</h1>
        <p class="lead" style="font-size: 1.3rem; color: var(--color-text-secondary); margin-bottom: 2.5rem; line-height: 1.6;">
          For years, I identified as a "coder." I took pride in my typing speed, my knowledge of syntax, and my ability to churn out thousands of lines. But I eventually realized I was hitting a ceiling. Here is the story of how I broke through that ceiling by transforming my SDE dev cycle—and how it changed everything.
        </p>
      </header>

      <section class="article-section">
        <h2>The Starting Line: The Manual Grind</h2>
        <p>We’ve all been there: a 40-hour work week where 30 hours are consumed by boilerplate, debugging typos, and chasing dependency hell. This was my "Manual Loop." I was so busy writing the code that I barely had time to think about the architecture. I was getting things done, but I wasn't unblocking the complex problems that really mattered.</p>
        
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
        <p>I realized that the bottleneck wasn't my ability to code—it was the cognitive load of keeping every detail in my head. I needed a way to scale my impact without just typing faster.</p>
      </section>

      <section class="article-section">
        <h2>The Turning Point: Discovering My First Force Multiplier</h2>
        <p>The shift began when I started leaning into <strong>AWS Kiro (CLI & Chat Panel)</strong>. At first, it was just for autocomplete. But as I pushed its limits, I realized it could do much more. It could refactor entire directories. It could generate test suites. It could even brainstorm architectural patterns with me.</p>
        
        <p>Suddenly, the Chat Panel wasn't just a search box—it was a partner. I’d describe a high-level vision, and we’d iterate on the design before I ever touched a file. This was the moment I stopped being a "coder" and started becoming an "orchestrator."</p>
      </section>

      <section class="article-section">
        <h2>The Breakthrough: Spec-Driven Development</h2>
        <p>The real leap happened when I formalized my approach into what I now call <strong>Spec-Driven Development</strong>. I stopped starting with `main.py` and started starting with a comprehensive Markdown spec.</p>
        
        <p>By writing a solid spec first, I provided a "source of truth" that my agents could follow with laser precision. The agent didn’t have to guess my intent; it just had to implement the blueprint. This reduced the "hallucination" problem to near-zero and transformed my role from implementation to validation.</p>
      </section>

      <section class="article-section">
        <h2>The New Horizon: Unblocking the Complex</h2>
        <p>Today, my dev cycles are 10x faster, but more importantly, they are more <strong>organized</strong>. I can tackle problems that would have felt overwhelming a year ago—like low-latency audio pipelines or complex distributed systems—because I have an army of agents helping me manage the complexity.</p>

        <div class="diagram-container" style="background: var(--color-background-secondary); padding: 2rem; border-radius: var(--radius-lg); margin: 2rem 0;">
          <div class="mermaid">
          graph LR
              C1[Community Experience] --> C2{Agentic Workflow}
              C2 --> C3[Complexity Unblocked]
              C2 --> C4[Speed Multiplied]
              C2 --> C5[Organized Scale]
              
              style C2 fill:#3b82f6,color:#fff
          </div>
        </div>

        <p>To the SDE community: we are at an inflection point. When we stop fighting the syntax, we start solving the <strong>real</strong> problems. It’s faster, it’s more organized, and it makes engineering deeply fulfilling again. Let’s stop just writing code and start orchestrating the future.</p>
      </section>

      <footer class="article-footer" style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--color-border);">
        <p><em>This is just the beginning of the journey. If you're building with agents or using AWS Kiro, let's connect and push the boundaries of what's possible together.</em></p>
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
