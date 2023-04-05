const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const fixtureDirs = fs.readdirSync(__dirname).filter((file) => {
  return fs.statSync(path.join(__dirname, file)).isDirectory();
});

const cmdArgs = [
  { cmd: 'yarn', args: ['install', '--force'] },
  { cmd: 'yarn', args: ['build'] },
  { cmd: 'yarn', args: ['serve:production'], timeout: 2000 },
];

fixtureDirs.forEach((dir) => {
  cmdArgs.forEach((cmdArg) => {
    const appPath = path.join(__dirname, dir);
    console.log(`> ${appPath} : ${cmdArg.cmd} ${cmdArg.args.join(' ')}`);

    const opts = {
      cwd: appPath,
      stdio: 'inherit',
      timeout: cmdArg.timeout, // Let the app running for a while
    };

    const result = child_process.spawnSync(cmdArg.cmd, cmdArg.args, {
      ...opts,
    });

    // If the app times out, it was built successfully and it was trying to connect to LFS
    if (result?.error?.code === 'ETIMEDOUT') {
      console.log('Process timed out - OK');
      return;
    }

    if (result.status !== 0) {
      throw new Error(`Failed to build an example app "${dir}"`);
    }
  });
});

console.log('-----------------------------------------');
console.log('All example apps were built successfully!');