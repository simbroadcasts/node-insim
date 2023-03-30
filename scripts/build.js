import * as esbuild from 'esbuild';

const commonConfig = {
  entryPoints: ['src/index.ts', 'src/packets/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  packages: 'external',
  outdir: 'dist',
  tsconfig: 'tsconfig.lib.json',
  logLevel: 'info',
};

await esbuild.build({
  ...commonConfig,
  format: 'cjs',
  outExtension: {
    '.js': '.cjs',
  },
});

await esbuild.build({
  ...commonConfig,
  format: 'esm',
  outExtension: {
    '.js': '.esm.js',
  },
});
