import NodeInSim, { PacketType } from '../src';
import { IS_ISI_ReqI, IS_VER } from '../src/packets';

const inSim = new NodeInSim.InSim();

const insimName = 'TestNodeApp';

inSim.connect({
  Host: '188.122.74.155',
  Port: 52317,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: 's4v4g3b4d',
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
