const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const examplesDir = path.join(__dirname, '..', 'examples');

function buildApps(directory, options = {}) {
  const fixtureDirs = fs
    .readdirSync(path.join(examplesDir, directory))
    .filter((file) => {
      return fs.statSync(path.join(examplesDir, directory, file)).isDirectory();
    });

  const cmdArgs = [
    { cmd: 'npm', args: ['install'] },
    ...(options.build ? [{ cmd: 'npm', args: ['run', 'build'] }] : []),
  ];

  fixtureDirs.forEach((appDir) => {
    cmdArgs.forEach((cmdArg) => {
      const appPath = path.join(examplesDir, directory, appDir);
      console.log(`> ${appPath} : ${cmdArg.cmd} ${cmdArg.args.join(' ')}`);

      const opts = {
        cwd: appPath,
        stdio: 'inherit',
        timeout: cmdArg.timeout, // Let the app running for a while
      };

      const result = child_process.spawnSync(cmdArg.cmd, cmdArg.args, {
        ...opts,
      });

      if (result.status !== 0) {
        throw new Error(
          `Failed to build an example app "${directory}/${appDir}"`,
        );
      }
    });
  });
}

buildApps('javascript', { build: false });
buildApps('typescript', { build: true });

console.log('-----------------------------------------');
console.log('All example apps were built successfully!');
