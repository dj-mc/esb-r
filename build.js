import esbuild from 'esbuild';

esbuild.buildSync({
  entryPoints: ['./src/index.tsx'],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: ['chrome99'],
  outdir: 'dist'
});
