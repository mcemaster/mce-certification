const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'dist/index.js',
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  jsx: 'automatic',
  jsxImportSource: 'hono/jsx',
  external: [],
  minify: true,
  sourcemap: false,
  define: {
    'process.env.NODE_ENV': '"production"'
  }
}).catch(() => process.exit(1));
