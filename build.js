import esbuild from 'esbuild';

esbuild.buildSync({
  entryPoints: ['./src/app.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome99'],
  outdir: 'dist'
});
