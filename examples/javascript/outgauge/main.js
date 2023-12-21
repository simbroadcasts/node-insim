const { OutGauge } = require('node-insim');

const outGauge = new OutGauge(5000);

console.log('Connecting...');

outGauge.connect({
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT) : 29998,
});

outGauge.on('connect', () => console.log('Connected'));

outGauge.on('disconnect', () => console.log('Disconnected'));

outGauge.on('timeout', () => console.log('Timed out'));

outGauge.on('packet', (data) => {
  console.clear();
  console.console.log(
    `${(data.Speed * 3.6).toFixed(0)} km/h | ${data.RPM.toFixed(0)} RPM`,
  );
});

process.on('uncaughtException', (error) => {
  console.log(error);
});
