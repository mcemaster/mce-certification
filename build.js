const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Clean and ensure output directories exist
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}
fs.mkdirSync('dist', { recursive: true });
fs.mkdirSync('dist/functions', { recursive: true });

// Create a minimal _routes.json to let functions handle all routes
const routesJson = {
  version: 1,
  include: ["/*"],
  exclude: []
};
fs.writeFileSync('dist/_routes.json', JSON.stringify(routesJson, null, 2));
console.log('Created dist/_routes.json');

// Create empty index.html placeholder (functions will handle all routes)
const indexHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>MCE</title></head>
<body><script>window.location.href='/';</script></body></html>`;
fs.writeFileSync('dist/index.html', indexHtml);
console.log('Created dist/index.html');

// Build the main app as ESM module for Cloudflare Pages Functions
esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'dist/functions/[[path]].js',
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
  jsx: 'automatic',
  jsxImportSource: 'hono/jsx',
  external: [],
  minify: true,
  sourcemap: false,
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  banner: {
    js: '// Cloudflare Pages Function\n'
  }
}).then(() => {
  console.log('Build completed successfully!');
  console.log('Output directory: dist/');
  console.log('  - dist/index.html (placeholder)');
  console.log('  - dist/_routes.json (routing config)');
  console.log('  - dist/functions/[[path]].js (Pages Function)');
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
