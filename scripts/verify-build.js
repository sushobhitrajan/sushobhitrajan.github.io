#!/usr/bin/env node

/**
 * Build Verification Script
 * Verifies that the production build is complete and valid
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');
const errors = [];
const warnings = [];

console.log('🔍 Verifying production build...\n');

// Check if dist directory exists
if (!fs.existsSync(distDir)) {
  errors.push('❌ dist/ directory does not exist. Run "npm run build" first.');
  printResults();
  process.exit(1);
}

// Check for index.html
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  errors.push('❌ index.html not found in dist/');
} else {
  console.log('✅ index.html found');

  // Check if index.html has content
  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  if (indexContent.length < 100) {
    warnings.push('⚠️  index.html seems too small (< 100 bytes)');
  }

  // Check for script tags
  if (!indexContent.includes('<script')) {
    warnings.push('⚠️  No script tags found in index.html');
  }

  // Check for stylesheet links
  if (!indexContent.includes('stylesheet') && !indexContent.includes('<style')) {
    warnings.push('⚠️  No stylesheets found in index.html');
  }
}

// Check for assets directory
const assetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  warnings.push('⚠️  assets/ directory not found in dist/');
} else {
  console.log('✅ assets/ directory found');

  // Check for CSS files
  const files = fs.readdirSync(assetsDir);
  const cssFiles = files.filter(f => f.endsWith('.css'));
  const jsFiles = files.filter(f => f.endsWith('.js'));

  if (cssFiles.length === 0) {
    warnings.push('⚠️  No CSS files found in assets/');
  } else {
    console.log(`✅ Found ${cssFiles.length} CSS file(s)`);
  }

  if (jsFiles.length === 0) {
    warnings.push('⚠️  No JavaScript files found in assets/');
  } else {
    console.log(`✅ Found ${jsFiles.length} JavaScript file(s)`);
  }

  // Check for source maps
  const mapFiles = files.filter(f => f.endsWith('.map'));
  if (mapFiles.length === 0) {
    warnings.push('⚠️  No source map files found (debugging may be difficult)');
  } else {
    console.log(`✅ Found ${mapFiles.length} source map(s)`);
  }
}

// Check for public assets
const publicDirs = ['images', 'icons', 'fonts'];
publicDirs.forEach(dir => {
  const publicPath = path.join(distDir, dir);
  if (fs.existsSync(publicPath)) {
    console.log(`✅ ${dir}/ directory found`);
  }
});

// Check file sizes
function getDirectorySize(dirPath) {
  let size = 0;

  if (!fs.existsSync(dirPath)) return 0;

  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      size += getDirectorySize(filePath);
    } else {
      size += stats.size;
    }
  });

  return size;
}

const totalSize = getDirectorySize(distDir);
const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);
console.log(`\n📦 Total build size: ${sizeMB} MB`);

if (totalSize > 10 * 1024 * 1024) {
  warnings.push(`⚠️  Build size is large (${sizeMB} MB). Consider optimization.`);
}

// Print results
function printResults() {
  console.log('\n' + '='.repeat(50));

  if (errors.length > 0) {
    console.log('\n❌ ERRORS:\n');
    errors.forEach(err => console.log(err));
  }

  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:\n');
    warnings.forEach(warn => console.log(warn));
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('\n✅ Build verification passed! All checks successful.\n');
  } else if (errors.length === 0) {
    console.log('\n✅ Build verification passed with warnings.\n');
  } else {
    console.log('\n❌ Build verification failed.\n');
  }

  console.log('='.repeat(50) + '\n');
}

printResults();

// Exit with error code if there are errors
if (errors.length > 0) {
  process.exit(1);
}
