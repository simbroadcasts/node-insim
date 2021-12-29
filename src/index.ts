import { PacketType, SmallType, TinyType, TtcType } from './packets';
import { InSim } from './protocols/InSim';

export const INSIM_VERSION = 9;

const NodeInSim = {
  InSim,
};

export { PacketType, SmallType, TinyType, TtcType };

export default NodeInSim;
