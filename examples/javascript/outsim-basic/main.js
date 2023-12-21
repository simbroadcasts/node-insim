const { OutSim } = require('node-insim');

const outSim = new OutSim(5000);

console.log('Connecting...');

outSim.connect({
  Host: '127.0.0.1',
  Port: 29998,
});

outSim.on('connect', () => console.log('Connected'));

outSim.on('disconnect', () => console.log('Disconnected'));

outSim.on('timeout', () => {
  console.log('Timed out');
  process.exit(1);
});

outSim.on('packet', (data) => {
  console.clear();
  console.log(`Acceleration: ${data.AccelX} ${data.AccelY} ${data.AccelZ}`);
  console.log(`Velocity: ${data.VelX} ${data.VelY} ${data.VelZ}`);
  console.log(`Position: ${data.PosX} ${data.PosY} ${data.PosZ}`);
});

process.on('uncaughtException', (error) => {
  console.log(error);
});
