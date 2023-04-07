import * as esbuild from 'esbuild';

const commonConfig = {
  entryPoints: ['src/index.ts', 'src/packets/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  packages: 'external',
  tsconfig: 'tsconfig.lib.json',
  logLevel: 'info',
};

await esbuild.build({
  ...commonConfig,
  format: 'cjs',
  outdir: 'dist/cjs',
});

await esbuild.build({
  ...commonConfig,
  format: 'esm',
  outdir: 'dist/esm',
  outExtension: {
    '.js': '.mjs',
  },
});
