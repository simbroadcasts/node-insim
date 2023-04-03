import './env.ts';

import debug from 'debug';
import { OutSim, OutSimPack } from 'node-insim';

const log = debug('node-insim-outsim-basic-ts');

const outSim = new OutSim(10000);

log('Connecting...');

outSim.connect({
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT) : 29997,
});

outSim.on('connect', () => log('Connected'));

outSim.on('disconnect', () => log('Disconnected'));

outSim.on('timeout', () => log('Timed out'));

outSim.on('packet', (data: OutSimPack) => {
  console.clear();
  console.log(`Acceleration: ${data.AccelX} ${data.AccelY} ${data.AccelZ}`);
  console.log(`Velocity: ${data.VelX} ${data.VelY} ${data.VelZ}`);
  console.log(`Position: ${data.PosX} ${data.PosY} ${data.PosZ}`);
});

process.on('uncaughtException', (error) => {
  log(error);
});
