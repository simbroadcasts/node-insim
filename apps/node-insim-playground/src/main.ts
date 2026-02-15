import path from 'node:path';

import dotenv from 'dotenv';
import fs from 'fs';
import { InSim } from 'node-insim';
import type { InSimPacketInstance } from 'node-insim/packets';
import { IS_ISI_ReqI, PacketType } from 'node-insim/packets';

const dotenvPath = path.resolve(__dirname, '.env');

[`${dotenvPath}.local`, dotenvPath].forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenv.config({ path: dotenvFile });
  }
});

const inSim = new InSim();

inSim.connect({
  IName: 'NodeInSimPlay',
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT, 10) : 29999,
  Admin: process.env.ADMIN ?? '',
  ReqI: IS_ISI_ReqI.SEND_VERSION,
});

inSim.on('connect', () => {
  console.log('Connected');
});

inSim.on('disconnect', () => {
  console.log('Disconnected');
});

inSim.on('error', (error) => {
  console.error('InSim error:', error);
});

inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: InSimPacketInstance<PacketType.ISP_VER>) {
  console.log(`Connected to LFS ${packet.Product} ${packet.Version}`);
}

process.on('uncaughtException', (error) => {
  console.log(error);
});
