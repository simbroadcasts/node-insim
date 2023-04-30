import { InSim } from 'node-insim';
import { PacketType, IS_VER } from 'node-insim/packets';

export function myPlugin(inSim: InSim) {
  inSim.on(PacketType.ISP_VER, (packet: IS_VER, inSim: InSim) => {
    console.log(`connected to ${packet.Version} ${inSim.id}`);
  });
}
