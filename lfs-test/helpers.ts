import type { InSimOptions } from '../src';

export function getInSimConnectionOptions(): InSimOptions {
  return {
    Host: process.env.HOST ?? '127.0.0.1',
    Port: process.env.PORT ? parseInt(process.env.PORT, 10) : 29999,
    Admin: process.env.ADMIN ?? '',
  };
}
