import { execSync } from 'child_process';
import { join } from 'path';

describe('Node InSim tests', () => {
  it('should print the LFS and InSim version', () => {
    const cliPath = join(process.cwd(), 'apps/node-insim-test/dist/main.js');

    const output = execSync(`node ${cliPath}`).toString();

    expect(output).toContain('LFS S3 0.8B9');
    expect(output).toContain('InSim 10');
  });
});
