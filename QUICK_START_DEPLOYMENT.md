# Quick Start: Deployment Guide

## 🚀 Deploy in 3 Steps

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Build and Verify

```bash
npm run build:verify
```

This will:
- Build the production bundle
- Verify the build is complete
- Check for common issues

### Step 3: Deploy

```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

GitHub Actions will automatically deploy your site to:
**https://sushobhitrajan.github.io**

---

## 📋 Pre-Deployment Checklist

Quick checks before deploying:

```bash
# Run tests
npm test

# Check code quality
npm run lint

# Build and verify
npm run build:verify

# Preview locally
npm run preview
```

Visit http://localhost:4173 to preview the production build.

---

## 🔍 Monitor Deployment

1. Go to your GitHub repository
2. Click the **Actions** tab
3. Watch the deployment workflow
4. Once complete, visit your live site

---

## ⚡ Quick Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run lint` | Check code quality |
| `npm run verify-build` | Verify build output |
| `npm run build:verify` | Build + verify |

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Fails
1. Check GitHub Actions logs
2. Verify GitHub Pages is enabled
3. Ensure you're pushing to `main` branch

### Site Shows 404
1. Wait 2-3 minutes for deployment
2. Check GitHub Pages settings
3. Verify base URL in `vite.config.js`

---

## 📚 Full Documentation

- **Detailed deployment guide:** `DEPLOYMENT.md`
- **Testing checklist:** `PRODUCTION_TESTING.md`
- **Complete summary:** `DEPLOYMENT_SUMMARY.md`

---

## ✅ Success Indicators

Your deployment is successful when:
- ✅ GitHub Actions workflow completes (green checkmark)
- ✅ Site loads at https://sushobhitrajan.github.io
- ✅ No console errors in browser DevTools
- ✅ All assets load correctly
- ✅ Lighthouse score > 90

---

**That's it! Your portfolio is now live.** 🎉
