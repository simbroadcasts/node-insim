import { InSim } from 'node-insim';
import { IS_ISI_ReqI, PacketType } from 'node-insim/packets';

const inSim = new InSim();

inSim.connect({
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT) : 29999,
  Admin: process.env.ADMIN ?? '',
  IName: 'InSim Test',
  ReqI: IS_ISI_ReqI.SEND_VERSION,
});

inSim.on(PacketType.ISP_VER, (packet) => {
  if (packet.ReqI === IS_ISI_ReqI.SEND_VERSION) {
    console.log(`LFS ${packet.Product} ${packet.Version}`);
    console.log(`InSim ${packet.InSimVer}`);
    process.exit(0);
  }
});
