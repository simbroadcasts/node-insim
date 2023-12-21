const { OutSim } = require('node-insim');

const outSim = new OutSim(10000);

console.log('Connecting...');

outSim.connect({
  Host: '127.0.0.1',
  Port: 29997,
  // Don't forget to set "OutSim Opts your_value" in cfg.txt!!! (or change this to match OUTSIMOPTS value from cfg.txt)
  OutSimOpts: 0x1ff,
});

outSim.on('connect', () => console.log('Connected'));

outSim.on('disconnect', () => console.log('Disconnected'));

outSim.on('timeout', () => {
  console.log('Timed out');
  process.exit(1);
});

outSim.on('packet', (data) => {
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
  console.log(error);
});
