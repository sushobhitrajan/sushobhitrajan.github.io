import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  // Base URL for GitHub Pages user site (username.github.io)
  // For project sites, use: base: '/repository-name/'
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'esbuild'
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  preview: {
    port: 4173,
    open: true
  }
});
