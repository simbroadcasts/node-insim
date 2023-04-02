import './env.ts';

import debug from 'debug';
import { InSim } from 'node-insim';
import { IR_HLR, IR_HOS, PacketType, HInfo } from 'node-insim/packets';

const log = debug('node-insim-relay-ts');

const inSim = new InSim();
inSim.connectRelay();

inSim.on('connect', () => {
  log('Connected');
  inSim.send(new IR_HLR());
});

inSim.on('disconnect', () => log('Disconnected'));

inSim.on(PacketType.IRP_HOS, (packet: IR_HOS) => {
  packet.Info.forEach((host: HInfo) => {
    log(`- ${host.HName}`);
  });
});

process.on('uncaughtException', (error) => {
  log(error);
});
