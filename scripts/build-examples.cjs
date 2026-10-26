const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const rootDir = path.join(__dirname, '..');
const examplesDir = path.join(rootDir, 'examples');

const RUN_TIMEOUT_MS = 3000;

function typeCheckExamples() {
  console.log('> tsc -p tsconfig.examples.json --noEmit');

  const result = child_process.spawnSync(
    'npx',
    ['tsc', '-p', 'tsconfig.examples.json', '--noEmit'],
    { cwd: rootDir, stdio: 'inherit' },
  );

  if (result.status !== 0) {
    throw new Error('Type checking of example apps failed');
  }
}

function findMainFiles(directory) {
  const languageDir = path.join(examplesDir, directory);

  return fs
    .readdirSync(languageDir)
    .filter((file) => fs.statSync(path.join(languageDir, file)).isDirectory())
    .map((appDir) => {
      const extension = directory === 'typescript' ? 'ts' : 'js';
      return path.join(languageDir, appDir, `main.${extension}`);
    });
}

function smokeRunExample(mainFile) {
  const relativePath = path.relative(rootDir, mainFile);
  console.log(`> tsx ${relativePath}`);

  const result = child_process.spawnSync('npx', ['tsx', mainFile], {
    cwd: rootDir,
    timeout: RUN_TIMEOUT_MS,
    encoding: 'utf-8',
  });

  // ETIMEDOUT means the app was still running when the timeout killed it
  // (expected for UDP-based OutSim/OutGauge examples, which never see a
  // handshake failure to exit on their own) - that's a pass.
  if (result.error && result.error.code === 'ETIMEDOUT') {
    return;
  }

  // Any other spawn error (e.g. tsx not found) or a non-zero exit code
  // (e.g. can't resolve "node-insim", syntax error) is a real failure.
  // A clean exit (status 0, e.g. connection refused with no LFS running)
  // is a pass.
  if (result.error || result.status !== 0) {
    console.log(result.stdout);
    console.error(result.stderr);
    throw new Error(`Example app "${relativePath}" failed to run`);
  }
}

typeCheckExamples();

['javascript', 'typescript'].forEach((directory) => {
  findMainFiles(directory).forEach(smokeRunExample);
});

console.log('-----------------------------------------');
console.log('All example apps were built successfully!');
