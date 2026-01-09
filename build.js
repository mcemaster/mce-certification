const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Ensure output directories exist
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}
if (!fs.existsSync('functions')) {
  fs.mkdirSync('functions', { recursive: true });
}

// Create a minimal index.html for static hosting (redirects to the app)
const indexHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>`;

fs.writeFileSync('public/index.html', indexHtml);
console.log('Created public/index.html');

// Build the main app as ESM module for Cloudflare Pages Functions
esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'functions/[[path]].js',
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
  console.log('Output: functions/[[path]].js');
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
