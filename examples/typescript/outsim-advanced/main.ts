import { OutSim, OutSimPack2, OutSimWheel } from 'node-insim';

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
  if (!(data instanceof OutSimPack2)) {
    return;
  }

  console.clear();
  row('AngVel', formatVector(data.OSMain.AngVel));
  row('Heading', formatNumber(data.OSMain.Heading));
  row('Pitch', formatNumber(data.OSMain.Pitch));
  row('Roll', formatNumber(data.OSMain.Roll));
  row('Accel', formatVector(data.OSMain.Accel));
  row('Vel', formatVector(data.OSMain.Vel));
  row('Pos', formatVector(data.OSMain.Pos));
  row('Throttle', formatNumber(data.OSInputs.Throttle));
  row('Brake', formatNumber(data.OSInputs.Brake));
  row('InputSteer', formatNumber(data.OSInputs.InputSteer));
  row('Clutch', formatNumber(data.OSInputs.Clutch));
  row('Handbrake', formatNumber(data.OSInputs.Handbrake));
  row('Gear', formatNumber(data.Gear));
  row('EngineAngVel', formatNumber(data.EngineAngVel));
  row('MaxTorqueAtVel', formatNumber(data.MaxTorqueAtVel));
  row('CurrentLapDist', formatNumber(data.CurrentLapDist));
  row('IndexedDistance', formatNumber(data.IndexedDistance));
  data.OSWheels.forEach((wheel: OutSimWheel, index: number) => {
    row(`OSWheels[${index}] - SuspDeflect`, formatNumber(wheel.SuspDeflect));
    row(`OSWheels[${index}] - Steer`, formatNumber(wheel.Steer));
    row(`OSWheels[${index}] - XForce`, formatNumber(wheel.XForce));
    row(`OSWheels[${index}] - YForce`, formatNumber(wheel.YForce));
    row(`OSWheels[${index}] - VerticalLoad`, formatNumber(wheel.VerticalLoad));
    row(`OSWheels[${index}] - AngVel`, formatNumber(wheel.AngVel));
    row(
      `OSWheels[${index}] - LeanRelToRoad`,
      formatNumber(wheel.LeanRelToRoad),
    );
    row(`OSWheels[${index}] - SlipFraction`, formatNumber(wheel.SlipFraction));
    row(`OSWheels[${index}] - SlipRatio`, formatNumber(wheel.SlipRatio));
    row(`OSWheels[${index}] - TanSlipAngle`, formatNumber(wheel.TanSlipAngle));
  });
  row('SteerTorque', formatNumber(data.SteerTorque));
});

const formatVector = (value: number[]) =>
  value.map((v) => formatNumber(v)).join('');
const formatNumber = (value: number) => value.toString().padStart(25);
const formatLabel = (value: string) => `${value}:`.toString().padEnd(28);
const row = (label: string, data: string) =>
  console.log(`${formatLabel(label)} ${data}`);

process.on('uncaughtException', (error) => {
  console.log(error);
});
