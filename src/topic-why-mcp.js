import { Navigation } from './components/Navigation.js';
import { BackgroundAnimation } from './components/BackgroundAnimation.js';

const links = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'skills', label: 'Skills', path: '/#skills' },
  { id: 'tech-topics', label: 'Tech Topics', path: '/technical-topics.html' },
  { id: 'connect', label: 'Mentorship', path: '/#connect' },
  { id: 'about', label: 'About', path: '/#about' },
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
      
      <h1 style="background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Why MCP? (The "N &times; M" Problem)</h1>
      
      <blockquote>
        This document explains the industry problem that the Model Context Protocol (MCP) was invented to solve.
      </blockquote>

      <h2>The Nightmare Before MCP: Fragmented Plugins</h2>
      <p>Before MCP existed, if you wanted to build a "Weather tool" or a "Calculator tool" that an AI could use, you had to write custom integration code for every single AI platform.</p>
      
      <p>If you wanted your tool to work everywhere, you had to build it multiple times:</p>
      <ol>
        <li>Write it for the <strong>OpenAI / ChatGPT Plugin API</strong></li>
        <li>Write it again for the <strong>Anthropic / Claude</strong> ecosystem</li>
        <li>Write it again for the <strong>Google / Gemini</strong> ecosystem</li>
        <li>Write it again for AI code editors like <strong>Cursor</strong> or <strong>Zed</strong></li>
      </ol>
      <p>If a new AI model was released, you had to rewrite your integration <em>again</em>. This created an exhausted, fragmented ecosystem where developers couldn't keep up.</p>

      <div class="diagram-container">
        <div class="mermaid">
        graph TD
            subgraph "Before MCP: The N × M Chaos"
                W1[Your Weather Code] -->|"OpenAI API"| C[ChatGPT]
                W2[Your Weather Code] -->|"Anthropic API"| A[Claude]
                W3[Your Weather Code] -->|"Google API"| G[Gemini]
            end

            classDef bad fill:#ef4444,stroke:#b91c1c,color:#fff
            classDef ai fill:#3b82f6,stroke:#1d4ed8,color:#fff
            class W1,W2,W3 bad
            class C,A,G ai
        </div>
      </div>

      <h2>The Solution: MCP (The Universal "USB Port" for AI)</h2>
      <p>Anthropic created the <strong>Model Context Protocol</strong> and open-sourced it so that <em>everyone</em> could use it. It is a universal standard that works exactly like a USB-C port for computers.</p>

      <p>Instead of writing custom code for every AI provider, the industry agreed on one standard protocol:</p>
      <ol>
        <li><strong>You write your tool ONCE</strong> as an MCP Server.</li>
        <li><strong>Every AI Host</strong> (Claude Desktop, Cursor, Zed, or a custom Gemini client) learns to speak the MCP protocol.</li>
        <li>The AI Hosts plug directly into your server, and it magically works everywhere.</li>
      </ol>

      <div class="diagram-container">
        <div class="mermaid">
        graph TD
            subgraph "After MCP: The Universal Standard"
                WMCP["🟢 Your MCP Server\n(Write once)"] -->|"Standard MCP Protocol"| C2[ChatGPT Host]
                WMCP -->|"Standard MCP Protocol"| A2[Claude Desktop]
                WMCP -->|"Standard MCP Protocol"| G2[Gemini Client]
                WMCP -->|"Standard MCP Protocol"| ED[Cursor / Zed Editors]
            end

            classDef good fill:#22c55e,stroke:#15803d,color:#fff
            classDef protocol fill:#f59e0b,stroke:#b45309,color:#fff
            classDef ai fill:#3b82f6,stroke:#1d4ed8,color:#fff
            
            class WMCP good
            class C2,A2,G2,ED ai
        </div>
      </div>

      <h2>What this means for your project</h2>
      <p>By building an MCP server using the official <code>@modelcontextprotocol/sdk</code>, your tools are future-proof.</p>
      <p>You can build a server and test it against a custom Gemini client—but you can now plug that exact same server into Claude Desktop or Cursor without changing a single line of your server code. You built a <strong>universal plugin</strong>.</p>
    </div>
  </main>
`;

const backgroundAnimation = new BackgroundAnimation({
  particleCount: 50,
  connectionDistance: 150
});

// Load Mermaid to render the diagrams
const script = document.createElement('script');
script.type = 'module';
script.innerHTML = `
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ 
  startOnLoad: true, 
  theme: 'default',
  fontFamily: 'Inter, sans-serif'
});
// Need to re-render in case app loaded after DOMContentLoaded
mermaid.init(undefined, document.querySelectorAll('.mermaid'));
`;
document.body.appendChild(script);

document.getElementById('app').classList.add('loaded');
