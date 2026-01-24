/**
 * BackgroundAnimation Component
 * Creates a subtle, interactive particle animation on the background canvas.
 * Features floating particles that react gently to mouse movement.
 */
export class BackgroundAnimation {
  constructor(options = {}) {
    this.options = {
      particleCount: options.particleCount || 50,
      connectionDistance: options.connectionDistance || 150,
      mouseDistance: options.mouseDistance || 200,
      ...options
    };

    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationFrameId = null;
    this.mouse = { x: null, y: null };
    this.resizeTimeout = null;

    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.createCanvas();
    this.setupEventListeners();
    this.ensureContentStacking();

    if (!this.prefersReducedMotion) {
      this.createParticles();
      this.animate();
    }
  }

  ensureContentStacking() {
    // Ensure the main app content sits ABOVE the background animation
    const app = document.getElementById('app');
    if (app) {
      app.style.position = 'relative';
      app.style.zIndex = '1';
    }
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'background-canvas';
    this.ctx = this.canvas.getContext('2d');

    // Style the canvas to sit fixed in the background
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '0', // Sit above body background, below content
      pointerEvents: 'none', // Allow clicks to pass through
      opacity: '1'
    });

    document.body.prepend(this.canvas);
    this.handleResize();
  }

  setupEventListeners() {
    // Window resize
    window.addEventListener('resize', () => {
      // Debounce resize
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.handleResize(), 100);
    });

    // Mouse movement
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    // Touch movement
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    });

    // Reset mouse when leaving window
    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    if (!this.prefersReducedMotion) {
      // Re-create particles on significant resize to maintain density
      this.createParticles();
    }
  }

  createParticles() {
    this.particles = [];
    const density = (this.canvas.width * this.canvas.height) / 15000; // Responsive density
    const count = Math.min(this.options.particleCount, density);

    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      particle.update(this.mouse);
      particle.draw(this.ctx);
    });

    // this.connectParticles(); // Lines removed per user request

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  connectParticles() {
    const maxDist = this.options.connectionDistance;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDist) {
          // Calculate opacity based on distance
          const opacity = 1 - (distance / maxDist);
          // Use the start particle's color but with reduced opacity for the line
          this.ctx.strokeStyle = this.particles[i].color.replace(')', `, ${opacity * 0.2})`).replace('rgb', 'rgba');
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.handleResize);
    this.canvas.remove();
  }
}

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    // Random velocity - float upwards slowly
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5 - 0.2; // Slight upward bias
    this.size = Math.random() * 2 + 1;

    // Colorful palette (Blue, Indigo, Purple, Pink, Teal)
    const colors = [
      '59, 130, 246',  // Blue-500
      '99, 102, 241',  // Indigo-500
      '168, 85, 247',  // Purple-500
      '236, 72, 153',  // Pink-500
      '20, 184, 166'   // Teal-500
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    this.color = `rgba(${randomColor}, ${Math.random() * 0.4 + 0.3})`; // 0.3-0.7 opacity
  }

  update(mouse) {
    // Move
    this.x += this.vx;
    this.y += this.vy;

    // Mouse interaction (repulse)
    if (mouse.x != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = 150;
      const force = (maxDistance - distance) / maxDistance;

      if (distance < maxDistance) {
        const directionX = forceDirectionX * force * 2;
        const directionY = forceDirectionY * force * 2;
        this.x -= directionX;
        this.y -= directionY;
      }
    }

    // Wrap around screen
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
