# Production Build Testing Checklist

This document provides a comprehensive checklist for testing the production build before deployment.

## Prerequisites

1. Install dependencies: `npm install`
2. Build production bundle: `npm run build`
3. Run build verification: `npm run verify-build`

## Automated Verification

### Build Verification Script

Run the automated build verification:

```bash
npm run verify-build
```

This script checks:
- ✅ dist/ directory exists
- ✅ index.html is present and has content
- ✅ Script tags are included
- ✅ Stylesheets are linked
- ✅ assets/ directory exists
- ✅ CSS files are generated
- ✅ JavaScript files are generated
- ✅ Source maps are generated
- ✅ Public assets are copied
- ✅ Total build size is reasonable

### Combined Build and Verify

```bash
npm run build:verify
```

## Manual Testing Checklist

### 1. Local Preview Testing

Start the preview server:

```bash
npm run preview
```

Visit: http://localhost:4173

#### Basic Functionality
- [ ] Page loads without errors
- [ ] All CSS styles are applied
- [ ] JavaScript executes without console errors
- [ ] No 404 errors in network tab

#### Visual Inspection
- [ ] Layout renders correctly
- [ ] Typography is readable
- [ ] Colors match design system
- [ ] Spacing follows 8px grid
- [ ] Shadows and borders are visible

### 2. Responsive Testing

Test at all breakpoints:

#### Mobile (< 640px)
- [ ] Single column layout
- [ ] Touch targets are minimum 44x44px
- [ ] Text is readable (16px minimum)
- [ ] Navigation is accessible
- [ ] No horizontal scroll

#### Tablet (640px - 768px)
- [ ] 2-column grid where appropriate
- [ ] Navigation adapts properly
- [ ] Images scale correctly
- [ ] Touch interactions work

#### Desktop (768px - 1024px)
- [ ] 3-column grid where appropriate
- [ ] Full navigation visible
- [ ] Hover effects work
- [ ] Content is centered

#### Large Desktop (> 1024px)
- [ ] 4-column grid where appropriate
- [ ] Max width constraint (1280px)
- [ ] Content is centered
- [ ] Generous spacing

### 3. Browser Testing

Test in multiple browsers:

#### Chrome/Edge (Chromium)
- [ ] Page loads correctly
- [ ] All features work
- [ ] No console errors
- [ ] Performance is good

#### Firefox
- [ ] Page loads correctly
- [ ] All features work
- [ ] No console errors
- [ ] CSS renders correctly

#### Safari (macOS/iOS)
- [ ] Page loads correctly
- [ ] All features work
- [ ] No console errors
- [ ] Webkit-specific features work

### 4. Performance Testing

#### Lighthouse Audit

Run Lighthouse in Chrome DevTools:

```
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Desktop" or "Mobile"
4. Click "Analyze page load"
```

**Target Scores:**
- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

#### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

#### Load Times
- [ ] First Contentful Paint: < 1.5s
- [ ] Time to Interactive: < 3.5s
- [ ] Total page size: < 2MB

### 5. Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Focus indicators are visible
- [ ] Skip to content link works
- [ ] No keyboard traps

#### Screen Reader Testing
- [ ] Page structure is logical
- [ ] Headings are hierarchical
- [ ] Images have alt text
- [ ] ARIA labels are present
- [ ] Links are descriptive

#### Color Contrast
- [ ] Text meets WCAG AA (4.5:1)
- [ ] Large text meets WCAG AA (3:1)
- [ ] Interactive elements are distinguishable

#### Tools
- [ ] Run axe DevTools
- [ ] Run WAVE browser extension
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver)

### 6. Asset Loading

#### Images
- [ ] All images load correctly
- [ ] Lazy loading works
- [ ] Fallback images display on error
- [ ] WebP/AVIF formats with fallbacks

#### Fonts
- [ ] Custom fonts load
- [ ] Font fallbacks work
- [ ] No FOUT (Flash of Unstyled Text)

#### Icons
- [ ] All icons display
- [ ] SVG icons render correctly
- [ ] Icon fallbacks work

### 7. Navigation Testing

#### Internal Links
- [ ] All internal links work
- [ ] Smooth scroll to sections
- [ ] Active link highlighting
- [ ] Back button works

#### External Links
- [ ] Open in new tab
- [ ] Have rel="noopener noreferrer"
- [ ] Icons indicate external links

### 8. Touch Interface Testing

Test on actual mobile devices:

#### Touch Interactions
- [ ] Tap targets are large enough (44x44px)
- [ ] No double-tap zoom on buttons
- [ ] Smooth momentum scrolling
- [ ] Immediate visual feedback (<50ms)
- [ ] Swipe gestures work (if applicable)

#### Touch Devices
- [ ] iOS Safari (iPhone)
- [ ] iOS Safari (iPad)
- [ ] Android Chrome
- [ ] Android Firefox

### 9. Animation Testing

#### Scroll Animations
- [ ] Elements animate on scroll
- [ ] IntersectionObserver works
- [ ] Animations are smooth (60fps)
- [ ] No jank or stuttering

#### Hover Animations
- [ ] Hover effects are smooth
- [ ] Transitions are appropriate
- [ ] No layout shift on hover

#### Reduced Motion
- [ ] Animations respect prefers-reduced-motion
- [ ] Content is still accessible
- [ ] No essential information in animations

### 10. Error Handling

#### Network Errors
- [ ] Graceful handling of failed requests
- [ ] Error messages are user-friendly
- [ ] Fallback content displays

#### Missing Assets
- [ ] Placeholder images for missing images
- [ ] Graceful degradation for missing fonts
- [ ] No broken layouts

### 11. SEO Testing

#### Meta Tags
- [ ] Title tag is present and descriptive
- [ ] Meta description is present
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] Canonical URL is set

#### Structured Data
- [ ] Schema.org markup (if applicable)
- [ ] Valid JSON-LD

#### Sitemap
- [ ] sitemap.xml is generated (if applicable)
- [ ] robots.txt is configured

### 12. Security Testing

#### HTTPS
- [ ] Site loads over HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate is valid

#### External Links
- [ ] rel="noopener noreferrer" on external links
- [ ] No sensitive data in URLs
- [ ] No inline scripts (CSP compliance)

## Post-Deployment Testing

After deploying to GitHub Pages:

### Live Site Checks
- [ ] Visit https://sushobhitrajan.github.io
- [ ] All pages load correctly
- [ ] Assets load from correct URLs
- [ ] No 404 errors
- [ ] HTTPS is enforced

### DNS and Domain
- [ ] Custom domain works (if configured)
- [ ] CNAME record is correct
- [ ] SSL certificate is valid

### Performance on Live Site
- [ ] Run Lighthouse on live URL
- [ ] Check Core Web Vitals
- [ ] Test from different locations

### Monitoring
- [ ] Set up error tracking
- [ ] Monitor analytics
- [ ] Check for console errors

## Troubleshooting

### Common Issues

**Issue: Assets return 404**
- Check base URL in vite.config.js
- Verify assets are in dist/assets/
- Check asset paths in HTML

**Issue: Styles not applied**
- Check CSS file is linked in HTML
- Verify CSS file exists in dist/assets/
- Check for CSS syntax errors

**Issue: JavaScript errors**
- Check browser console
- Verify JS file exists in dist/assets/
- Check for module loading errors

**Issue: Poor performance**
- Optimize images
- Enable code splitting
- Minimize bundle size
- Use lazy loading

## Automated Testing

For continuous integration, add these checks to your CI/CD pipeline:

```yaml
- name: Build and verify
  run: npm run build:verify

- name: Run Lighthouse CI
  run: npx lighthouse-ci --upload.target=temporary-public-storage
```

## Sign-off

Before deploying to production:

- [ ] All automated checks pass
- [ ] All manual tests complete
- [ ] Performance meets targets
- [ ] Accessibility requirements met
- [ ] Cross-browser testing complete
- [ ] Mobile testing complete
- [ ] Stakeholder approval received

**Tested by:** _______________
**Date:** _______________
**Approved by:** _______________
**Date:** _______________
