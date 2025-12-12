import { InSim } from 'node-insim';
import type { InSimPacketInstance } from 'node-insim/packets';
import { IS_ISI_ReqI, PacketType } from 'node-insim/packets';

const inSim = new InSim();

inSim.connect({
  IName: 'Node InSim App',
  Host: '127.0.0.1',
  Port: 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: '',
});

inSim.on('connect', () => {
  console.log('Connected');
});

inSim.on('disconnect', () => {
  console.log('Disconnected');
});

inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: InSimPacketInstance<PacketType.ISP_VER>) {
  console.log(`Connected to LFS ${packet.Product} ${packet.Version}`);
}

process.on('uncaughtException', (error) => {
  console.log(error);
});
