import { InSim } from 'node-insim';
import { IR_HLR, IR_HOS, PacketType, HInfo } from 'node-insim/packets';

const inSim = new InSim();
inSim.connectRelay();

inSim.on('connect', () => {
  console.log('Connected');
  inSim.send(new IR_HLR());
});

inSim.on('disconnect', () => {
  console.log('Disconnected');
});

inSim.on(PacketType.IRP_HOS, (packet: IR_HOS) => {
  packet.Info.forEach((host: HInfo) => {
    console.log(`- ${host.HName}`);
  });
});

process.on('uncaughtException', (error) => {
  console.log(error);
});
