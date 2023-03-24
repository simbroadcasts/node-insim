#!/usr/bin/env node

import chalk from 'chalk';
import childProcess from 'child_process';
import path from 'path';
import { dirname } from 'path';
import readline from 'readline';
import semver from 'semver';
import { fileURLToPath } from 'url';

import { checkAnswerOrExit, execSyncAndLog } from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mainBranch = 'master';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const bumpTo = process.argv[2] || 'patch';

const projectDirectory = path.resolve(__dirname, '../');

process.chdir(path.resolve(projectDirectory));

const version = execSyncAndLog(`npm --no-git-tag-version version ${bumpTo}`)
  .toString()
  .trim();

if (!version) {
  console.log(chalk.red('Could not extract version'));
  process.exit(1);
}

const numericVersion = semver.clean(version);

if (!numericVersion) {
  console.log(chalk.red(`Version cannot be parsed: ${version}`));
  process.exit(1);
}

const tag = version;
const msg = `Bump to ${version}`;

let currentBranch;

try {
  currentBranch = childProcess
    .execSync('git symbolic-ref -q HEAD')
    .toString()
    .trim();
} catch (e) {
  currentBranch = '';
}

execSyncAndLog('git add package.json');

execSyncAndLog(`git diff --cached --color`, 'This diff will be committed:');

const currentBranchReleaseWarning = () => {
  if (currentBranch !== `refs/heads/${mainBranch}`) {
    return chalk.yellow(
      `🚨Are you sure that you want to release from a non-main branch?🚨 The main branch is ${mainBranch}.`,
    );
  }

  return '';
};

rl.question(
  `
👆> This script requires direct push rights to master. It is intended for repo MAINTAINERS.
${chalk.yellow(`❗️> Caution this script will create a commit and a tag, then it pushes the current branch and the newly created tag.
Be sure you have the latest version of your branch.`)}

  Directory:      ${projectDirectory}
  Current branch: ${currentBranch} ${currentBranchReleaseWarning()}
  Tag:            ${tag}

  Is this diff ok for you? Should I commit and push? [y/N] `,
  (answer) => {
    checkAnswerOrExit(answer);
    execSyncAndLog(`git commit -m "${msg}"`);
    execSyncAndLog(`git tag -m "${msg}" "${tag}"`);
    currentBranch && execSyncAndLog(`git push`);
    execSyncAndLog(`git push origin "${tag}"`);

    console.log(
      chalk.green(`✅> All done! ${projectDirectory} bumped to ${version}.`),
    );
    process.exit(0);
  },
);
