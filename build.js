import esbuild from 'esbuild';

esbuild.buildSync({
  entryPoints: ['./src/app.jsx'],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: ['chrome99'],
  outdir: 'dist'
});
