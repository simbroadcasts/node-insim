import { OutGauge, OutGaugePack } from 'node-insim';

const outGauge = new OutGauge(5000);

console.log('Connecting...');

outGauge.connect({
  Host: '127.0.0.1',
  Port: 29998,
});

outGauge.on('connect', () => {
  console.log('Connected');
});

outGauge.on('disconnect', () => {
  console.log('Disconnected');
});

outGauge.on('timeout', () => {
  console.log('Timed out');
});

outGauge.on('packet', (data: OutGaugePack) => {
  console.clear();
  console.log(
    `${(data.Speed * 3.6).toFixed(0)} km/h | ${data.RPM.toFixed(0)} RPM`,
  );
});

process.on('uncaughtException', (error) => {
  console.log(error);
});
