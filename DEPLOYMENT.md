# Deployment Guide

This document describes how to build and deploy the portfolio website to GitHub Pages.

## Prerequisites

- Node.js v18 or higher
- npm (comes with Node.js)
- Git
- GitHub account with access to the repository

## Build Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Build

Run the development server with hot module replacement:

```bash
npm run dev
```

The site will be available at http://localhost:3000

### 3. Production Build

Build the optimized production bundle:

```bash
npm run build
```

This will:
- Minify CSS and JavaScript using Terser
- Generate source maps for debugging
- Bundle and optimize assets
- Output to the `dist/` directory
- Split vendor code into separate chunks

### 4. Preview Production Build

Test the production build locally:

```bash
npm run preview
```

The production build will be served at http://localhost:4173

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The repository is configured with GitHub Actions for automatic deployment.

**How it works:**
1. Push changes to the `main` branch
2. GitHub Actions automatically runs the workflow
3. The workflow:
   - Installs dependencies
   - Runs linting (non-blocking)
   - Runs tests (non-blocking)
   - Builds the production bundle
   - Deploys to GitHub Pages

**Workflow file:** `.github/workflows/deploy.yml`

**To trigger deployment:**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

The site will be live at: https://sushobhitrajan.github.io

### Manual Deployment

If you need to deploy manually:

1. **Build the production bundle:**
   ```bash
   npm run build
   ```

2. **Deploy using GitHub Pages settings:**
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - The workflow will handle deployment

### Manual Deployment (Alternative - Not Recommended)

If GitHub Actions is not available:

1. Build the production bundle:
   ```bash
   npm run build
   ```

2. Push the `dist/` folder to the `gh-pages` branch:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

## Environment Configuration

### Base URL Configuration

The site is configured for a GitHub Pages user site (username.github.io).

**Current configuration in `vite.config.js`:**
```javascript
base: '/'
```

**If deploying to a project site** (e.g., username.github.io/project-name):
```javascript
base: '/project-name/'
```

### Build Output

- **Output directory:** `dist/`
- **Assets directory:** `dist/assets/`
- **Source maps:** Enabled for debugging
- **Minification:** Terser (production only)

## Deployment Checklist

Before deploying to production:

- [ ] Run tests: `npm test`
- [ ] Run linting: `npm run lint`
- [ ] Check formatting: `npm run format:check`
- [ ] Build production bundle: `npm run build`
- [ ] Preview production build: `npm run preview`
- [ ] Test responsive layouts at all breakpoints
- [ ] Test on mobile devices
- [ ] Run accessibility audit (Lighthouse)
- [ ] Run performance audit (Lighthouse score > 90)
- [ ] Verify all images load correctly
- [ ] Test all navigation links
- [ ] Verify external links open in new tabs

## GitHub Pages Configuration

### Repository Settings

1. Go to repository **Settings** → **Pages**
2. **Source:** GitHub Actions
3. **Custom domain** (optional): Configure CNAME if using custom domain
4. **Enforce HTTPS:** Enabled (recommended)

### Permissions

The GitHub Actions workflow requires these permissions:
- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - OIDC token for deployment

These are configured in `.github/workflows/deploy.yml`

## Troubleshooting

### Build Fails

**Issue:** Build fails with dependency errors
```bash
npm ci --legacy-peer-deps
npm run build
```

**Issue:** Build fails with memory errors
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Deployment Fails

**Issue:** GitHub Actions workflow fails
1. Check the Actions tab in GitHub
2. Review the workflow logs
3. Ensure GitHub Pages is enabled in repository settings
4. Verify workflow permissions are correct

**Issue:** Site shows 404 after deployment
1. Check that `base` URL in `vite.config.js` is correct
2. Verify GitHub Pages source is set to "GitHub Actions"
3. Wait a few minutes for DNS propagation

### Assets Not Loading

**Issue:** CSS/JS files return 404
1. Check the `base` URL configuration
2. Verify assets are in the `dist/assets/` directory
3. Check browser console for specific errors

**Issue:** Images not loading
1. Verify images are in the `public/images/` directory
2. Check image paths in HTML/CSS (should be relative)
3. Ensure images are included in the build

## Performance Optimization

The build is configured for optimal performance:

- **Code splitting:** Vendor code separated into chunks
- **Minification:** CSS and JavaScript minified
- **Tree shaking:** Unused code removed
- **Source maps:** Available for debugging
- **Asset optimization:** Images and fonts optimized

## Monitoring

After deployment, monitor:

- **Lighthouse scores:** Performance, Accessibility, Best Practices, SEO
- **Core Web Vitals:** LCP, FID, CLS
- **Error tracking:** Browser console errors
- **Analytics:** User behavior and traffic

## Rollback

To rollback to a previous version:

1. Find the commit hash of the working version
2. Revert to that commit:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```
3. GitHub Actions will automatically redeploy

## Additional Resources

- [Vite Build Documentation](https://vitejs.dev/guide/build.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

For issues or questions:
1. Check the GitHub Actions logs
2. Review this documentation
3. Check Vite and GitHub Pages documentation
4. Open an issue in the repository
