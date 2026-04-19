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
          For years, I identified as a "coder." I took pride in my typing speed, my knowledge of syntax, and my ability to churn out thousands of lines. But I eventually realized I was hitting a ceiling—not of effort, but of complexity. Here is the story of how I broke through that ceiling by transforming my SDE dev cycle—and how it changed everything.
        </p>
      </header>

      <section class="article-section">
        <h2>The Starting Line: Breaking the Manual Grind</h2>
        <p>We’ve all been there: a 40-hour work week where 30 hours are consumed by the "Tax of Implementation." Boilerplate code, chasing dependency mismatches, and the soul-crushing cycle of <code>SyntaxError</code> &rarr; <code>Fix</code> &rarr; <code>Run</code> &rarr; <code>Repeat</code>. This was my life. I was so bogged down in the <em>how</em> of the code that I barely had the mental energy left for the <em>what</em> of the architecture.</p>
        
        <p>I realized I was suffering from "Context Fragmentation." Every time I had to look up a library's API or manually refactor a class, a piece of the high-level architecture fell out of my head. I was getting things done, but I wasn't solving the "unreachable" problems—those deep, complex architectural puzzles that require 100% of your focus to solve.</p>

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
        <p>The bottleneck wasn't my typing speed—it was my cognitive bandwidth. I needed a way to offload the "Implementation Tax" so I could spend my limited human focus on the parts of the problem that actually required a human brain.</p>
      </section>

      <section class="article-section">
        <h2>The Turning Point: Discovering a New Partner in AWS Kiro</h2>
        <p>The shift began with <strong>AWS Kiro (CLI & Chat Panel)</strong>. Initially, I used it as a "super-autocomplete." But one afternoon, I had to refactor a complex authentication module that touched thirty different files. Normally, that would be a day of tedious work. I decided to challenge Kiro.</p>
        
        <p>I described the target state in the Chat Panel and asked the CLI to execute the migration. In three minutes, the work was done. Not only was it fast, but it was <em>consistent</em>. That was the "Aha!" moment. I realized that the agent wasn't just a tool; it was a partner that could maintain perfect consistency across a massive codebase—something a human brain struggles with under pressure.</p>
        
        <p>Now, I use the Chat Panel for architectural brainstorming. I'll throw a half-baked idea at it, and Kiro helps me identify the edge cases and race conditions before I even create a file. This "Pre-Implementation Iteration" has saved me hundreds of hours of rework.</p>
      </section>

      <section class="article-section">
        <h2>The Breakthrough: Spec-Driven Development</h2>
        <p>This is where the transformation became a discipline. I formalized my approach into <strong>Spec-Driven Development</strong>. I stopped starting with code and started starting with <strong>Specifications</strong>. I treat my Markdown specs as the "Source of Truth"—the absolute definition of what the system must do.</p>
        
        <p>When you provide an agent with a flawless spec, you give it a blueprint it can follow with near-zero error. This fundamentally changes my job description:</p>
        <ul>
          <li><strong>I am the Architect:</strong> Defining the data structures, the interfaces, and the logic flow.</li>
          <li><strong>The Agent is the Builder:</strong> Handling the boilerplate, the syntax, and the boilerplate implementation.</li>
          <li><strong>I am the Validator:</strong> Reviewing the generated code to ensure it meets the spec.</li>
        </ul>
        <p>This "Spec-first" approach ensures that my documentation never goes out of date, because the documentation <em>is</em> the engine that generates the code.</p>
      </section>

      <section class="article-section">
        <h2>Unblocking the Unreachable: Solving for Scale</h2>
        <p>The most profound impact has been the ability to unblock complex problems that I would have previously set aside. Take the <strong>OrcaVoz</strong> project, for example. Building a real-time, multi-participant voice pipeline with sub-100ms latency is an architectural nightmare. It involves complex state management, cross-language translation, and tight performance constraints.</p>

        <div class="diagram-container" style="background: var(--color-background-secondary); padding: 2rem; border-radius: var(--radius-lg); margin: 2rem 0;">
          <div class="mermaid">
          graph TD
              A[Complex Problem] --> B{Manual Approach}
              B -->|Overwhelmed| C[Stalled/MVP Only]
              
              A --> D{Agentic Approach}
              D -->|Offload Boilerplate| E[Architectural Clarity]
              E -->|Deep Focus| F[Innovative Solution]
              F --> G[Production Ready]
              
              style C fill:#fee2e2,stroke:#ef4444
              style G fill:#dcfce7,stroke:#22c55e
          </div>
        </div>

        <p>By using agents to handle the tedious parts of the implementation, I can keep my entire focus on the core low-latency logic. I am doing things faster, yes, but more importantly, I am doing things <strong>better</strong> and in a far more <strong>organized</strong> way. I can scale the complexity of my projects without scaling the chaos.</p>
      </section>

      <section class="article-section">
        <h2>The New Horizon: A Community of Orchestrators</h2>
        <p>To the SDE community: we are at an inflection point. The "Code is King" era is ending. The "Context is King" era is beginning. The most successful developers of the next decade won't be those who can type the most code, but those who can most clearly communicate architectural intent to a fleet of autonomous agents.</p>

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

        <p>Let's stop fighting the syntax and start sculpting the future. It’s faster, it’s more organized, and it makes engineering deeply fulfilling again. The journey is just beginning, and I'd love for you to join me.</p>
      </section>

      <footer class="article-footer" style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--color-border);">
        <p><em>If you're building with agents or using AWS Kiro, let's connect. I'm always looking for others who are pushing the boundaries of what it means to be an SDE in the agentic era.</em></p>
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
