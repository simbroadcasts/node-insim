import * as fs from 'fs';

fs.renameSync('dist/esm/index.d.ts', 'dist/esm/index.d.mts');
fs.renameSync('dist/esm/packets/index.d.ts', 'dist/esm/packets/index.d.mts');
