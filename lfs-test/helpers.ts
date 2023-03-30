import type { InSimOptions } from '../src/InSim';

export function getInSimConnectionOptions(): InSimOptions {
  return {
    Host: process.env.TEST_LFS_HOST ?? '127.0.0.1',
    Port: process.env.TEST_LFS_PORT
      ? parseInt(process.env.TEST_LFS_PORT, 10)
      : 29999,
  };
}
