# Sushobhit Rajan - Developer Portfolio

Modern developer portfolio with a clean white theme, flawless touch experience, and component-based architecture.

## 🚀 Quick Start

### Deploy Now

```bash
npm install
npm run build:verify
git push origin main
```

See [QUICK_START_DEPLOYMENT.md](QUICK_START_DEPLOYMENT.md) for details.

### Develop Locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## 📚 Documentation

- **[Quick Start Deployment](QUICK_START_DEPLOYMENT.md)** - Deploy in 3 steps
- **[Deployment Guide](DEPLOYMENT.md)** - Comprehensive deployment documentation
- **[Production Testing](PRODUCTION_TESTING.md)** - Testing checklist before deployment
- **[Setup Guide](SETUP.md)** - Initial project setup details
- **[Test Instructions](TEST_INSTRUCTIONS.md)** - Running tests

## Project Structure

```
sushobhitrajan.github.io/
├── src/                    # Source files
│   ├── components/         # Reusable UI components
│   ├── styles/            # Modular CSS
│   │   ├── base/          # Reset, variables, typography
│   │   ├── components/    # Component-specific styles
│   │   └── layouts/       # Layout utilities
│   ├── utils/             # Utility functions
│   ├── data/              # Content data (JSON)
│   ├── pages/             # Page-specific code
│   ├── test/              # Test files
│   └── main.js            # Application entry point
├── public/                # Static assets
│   ├── images/            # Images
│   ├── icons/             # Icons and SVGs
│   └── fonts/             # Custom fonts
├── .github/workflows/     # GitHub Actions
├── scripts/               # Build and utility scripts
├── dist/                  # Build output (gitignored)
├── index.html             # Main HTML entry
├── vite.config.js         # Vite configuration
├── vitest.config.js       # Test configuration
└── package.json           # Project dependencies
```

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Starts the Vite development server at `http://localhost:3000` with hot module replacement.

### Build for Production

```bash
npm run build
```

Builds the project for production to the `dist/` directory with optimizations and minification.

### Preview Production Build

```bash
npm run preview
```

Previews the production build locally at `http://localhost:4173`.

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

### Build Verification

```bash
# Verify build output
npm run verify-build

# Build and verify in one command
npm run build:verify
```

## Deployment

### Automatic Deployment

Push to the `main` branch to automatically deploy via GitHub Actions:

```bash
git push origin main
```

The site will be live at: **https://sushobhitrajan.github.io**

### Manual Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for manual deployment instructions.

## Technology Stack

- **Build Tool**: Vite 5.x
- **Styling**: CSS with CSS Custom Properties
- **JavaScript**: Vanilla ES6+
- **Testing**: Vitest + fast-check (property-based testing)
- **Content**: JSON for structured data
- **Deployment**: GitHub Pages with GitHub Actions
- **CI/CD**: Automated testing and deployment

## Features

- ✨ Modern white theme inspired by Cursor
- 📱 Flawless touch experience (44x44px touch targets)
- 🎨 Component-based architecture
- ⚡ Fast build times with Vite
- 🎯 Performance-optimized (Lighthouse score > 90)
- ♿ WCAG 2.1 AA compliant
- 📦 Modular CSS architecture
- 🧪 Property-based testing with fast-check
- 🚀 Automatic deployment with GitHub Actions
- 📏 8px spacing grid system
- 🎭 Smooth animations with reduced motion support

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:ui` | Run tests with UI |
| `npm run verify-build` | Verify build output |
| `npm run build:verify` | Build and verify |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Run linting: `npm run lint`
5. Build and verify: `npm run build:verify`
6. Submit a pull request

## License

MIT License - see LICENSE file for details

---

**Live Site:** https://sushobhitrajan.github.io
