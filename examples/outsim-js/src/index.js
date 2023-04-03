require('./env');

const debug = require('debug');
const { OutSim } = require('node-insim');

const log = debug('node-insim-outsim-js');

const outGauge = new OutSim(5000);

log('Connecting...');

outGauge.connect({
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT) : 29998,
});

outGauge.on('connect', () => log('Connected'));

outGauge.on('disconnect', () => log('Disconnected'));

outGauge.on('timeout', () => log('Timed out'));

outGauge.on('packet', (data) => {
  console.clear();
  console.log(`Acceleration: ${data.AccelX} ${data.AccelY} ${data.AccelZ}`);
  console.log(`Velocity: ${data.VelX} ${data.VelY} ${data.VelZ}`);
  console.log(`Position: ${data.PosX} ${data.PosY} ${data.PosZ}`);
});

process.on('uncaughtException', (error) => {
  log(error);
});
