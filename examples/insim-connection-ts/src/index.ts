import './env.ts';

import debug from 'debug';
import { InSim } from 'node-insim';
import type { IS_VER } from 'node-insim/packets';
import { IS_ISI_ReqI, PacketType, IS_BTN } from 'node-insim/packets';

const log = debug('node-insim-ts');

const inSim = new InSim();

inSim.connect({
  IName: 'Node InSim App',
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT) : 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: process.env.ADMIN ?? '',
});

inSim.on('connect', () => log('Connected'));

inSim.on('disconnect', () => log('Disconnected'));

inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: IS_VER) {
  log(`Connected to LFS ${packet.Product} ${packet.Version}`);

  inSim.send(
    new IS_BTN({
      ReqI: 1,
      ClickID: 1,
      T: 2,
      L: 30,
      W: 40,
      H: 10,
      UCID: 255,
      Text: convertUtf8ToLFSMessage('tščř'),
    }),
  );
}

function convertUtf8ToLFSMessage(msg: string) {
  let lfsMsg = 'e';

  msg.split('').forEach((char) => {
    const a = new TextEncoder();
    a.encode(char);
  });

  return lfsMsg;
}

process.on('uncaughtException', (error) => {
  log(error);
});
