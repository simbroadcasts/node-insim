import './env.ts';

import debug from 'debug';
import { OutGauge, OutGaugePack } from 'node-insim';

const log = debug('node-insim-outgauge-ts');

const outGauge = new OutGauge(5000);

log('Connecting...');

outGauge.connect({
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT) : 29998,
});

outGauge.on('connect', () => log('Connected'));

outGauge.on('disconnect', () => log('Disconnected'));

outGauge.on('timeout', () => log('Timed out'));

outGauge.on('packet', (data: OutGaugePack) => {
  console.clear();
  console.log(
    `${(data.Speed * 3.6).toFixed(0)} km/h | ${data.RPM.toFixed(0)} RPM`,
  );
});

process.on('uncaughtException', (error) => {
  log(error);
});
