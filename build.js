const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Ensure output directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

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
}).catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
