require('./env');

const debug = require('debug');
const { OutSim } = require('node-insim');

const log = debug('node-insim-outsim-basic-js');

const outSim = new OutSim(5000);

log('Connecting...');

outSim.connect({
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT) : 29998,
});

outSim.on('connect', () => log('Connected'));

outSim.on('disconnect', () => log('Disconnected'));

outSim.on('timeout', () => {
  log('Timed out');
  process.exit(1);
});

outSim.on('packet', (data) => {
  console.clear();
  console.log(`Acceleration: ${data.AccelX} ${data.AccelY} ${data.AccelZ}`);
  console.log(`Velocity: ${data.VelX} ${data.VelY} ${data.VelZ}`);
  console.log(`Position: ${data.PosX} ${data.PosY} ${data.PosZ}`);
});

process.on('uncaughtException', (error) => {
  log(error);
});
