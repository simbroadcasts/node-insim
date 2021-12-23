import { InSim } from './InSim';
import { IS_ISI_ReqI } from './packets/IS_ISI';
import { IS_VER } from './packets/IS_VER';
import { PacketType, SmallType, TinyType, TtcType } from './packetTypes';

const NodeInSim = {
  InSim,
};

// Test usage
const inSim = new NodeInSim.InSim({
  host: '10.0.0.100',
  port: 29998,
  ReqI: IS_ISI_ReqI.REQI_SEND_VERSION,
});

inSim.connect();

function onVersion(packet: IS_VER, insim: InSim) {
  console.log('LFS version', packet.Version);
}

inSim.on(PacketType[PacketType.ISP_VER], onVersion);

export { PacketType, SmallType, TinyType, TtcType };

export default NodeInSim;
