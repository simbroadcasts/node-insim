import NodeInSim, { PacketType } from '../src';
import { IS_ISI_ReqI, IS_VER } from '../src/packets';

const inSim = new NodeInSim.InSim();

const insimName = 'TestNodeApp';

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  IName: insimName,
});

inSim.on('connect', () => console.log(`${insimName}: connected`));
inSim.on('disconnect', () => console.log(`${insimName}: disconnected`));
inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: IS_VER) {
  console.log(`${insimName}: LFS version`, packet.Version);
}

inSim.on('error', (error) => {
  console.error(`${insimName}: Error:`, error);
});
