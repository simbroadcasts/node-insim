#!/usr/bin/env node

import childProcess from 'child_process';

export const execSyncAndLog = (command, comment) => {
  console.log(`\n⚡️> ${comment || command}\n`);

  const stdOut = childProcess.execSync(command);

  process.stdout.write(stdOut);
  return stdOut;
};

export const checkAnswerOrExit = (answer) => {
  if (answer.trim().toLocaleLowerCase() !== 'y') {
    process.exit(1);
  }
};
