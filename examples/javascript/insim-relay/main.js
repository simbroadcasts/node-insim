const { InSim } = require('node-insim');
const { IR_HLR, PacketType } = require('node-insim/packets');

const inSim = new InSim();
inSim.connectRelay();

inSim.on('connect', () => {
  console.log('Connected');
  inSim.send(new IR_HLR());
});

inSim.on('disconnect', () => console.log('Disconnected'));

inSim.on(PacketType.IRP_HOS, (packet) => {
  packet.Info.forEach((host) => {
    console.log(`- ${host.HName}`);
  });
});

process.on('uncaughtException', (error) => {
  console.log(error);
});
