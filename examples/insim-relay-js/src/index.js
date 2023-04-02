require('./env');

const debug = require('debug');
const { InSim } = require('node-insim');
const { IR_HLR, PacketType } = require('node-insim/packets');

const log = debug('node-insim-relay-js');

const inSim = new InSim();
inSim.connectRelay();

inSim.on('connect', () => {
  log('Connected');
  inSim.send(new IR_HLR());
});

inSim.on('disconnect', () => log('Disconnected'));

inSim.on(PacketType.IRP_HOS, (packet) => {
  packet.Info.forEach((host) => {
    log(`- ${host.HName}`);
  });
});

process.on('uncaughtException', (error) => {
  log(error);
});
