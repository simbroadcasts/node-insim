import './env.ts';

import debug from 'debug';
import { OutSim, OutSimPack2 } from 'node-insim';

const log = debug('node-insim-outsim-basic-ts');

const outSim = new OutSim(10000);

log('Connecting...');

outSim.connect({
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT) : 29997,
  OutSimOpts: 0x1ff, // Don't forget to set "OutSim Opts 1ff" in cfg.txt!!! (or change this to match)
});

outSim.on('connect', () => log('Connected'));

outSim.on('disconnect', () => log('Disconnected'));

outSim.on('timeout', () => log('Timed out'));

outSim.on('packet', (data: OutSimPack2) => {
  console.clear();
  console.log(
    `Velocity: ${data.OSMain.Vel[0]} ${data.OSMain.Vel[1]} ${data.OSMain.Vel[2]}`,
  );
  console.log(
    `Airspeed: ${Math.sqrt(
      Math.pow(data.OSMain.Vel[0], 2) +
        Math.pow(data.OSMain.Vel[1], 2) +
        Math.pow(data.OSMain.Vel[2], 2),
    )} m/s`,
  );
  console.log(
    `Position: ${data.OSMain.Pos[0]} ${data.OSMain.Pos[1]} ${data.OSMain.Pos[2]}`,
  );
  console.log(`Gear: ${data.Gear}`);
  console.log(`Rpm: ${(30 * data.EngineAngVel) / Math.PI}`);
});

process.on('uncaughtException', (error) => {
  log(error);
});
