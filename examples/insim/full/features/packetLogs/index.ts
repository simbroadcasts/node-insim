import { PacketType } from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { onButtonClick } from './onButtonClick';
import { onButtonType } from './onButtonType';
import { onSmall } from './onSmall';
import { onTiny } from './onTiny';
import { onVersion } from './onVersion';

export function logPackets(inSim: InSim) {
  inSim.on(PacketType.ISP_VER, onVersion);
  inSim.on(PacketType.ISP_TINY, onTiny);
  inSim.on(PacketType.ISP_SMALL, onSmall);
  inSim.on(PacketType.ISP_BTC, onButtonClick);
  inSim.on(PacketType.ISP_BTT, onButtonType);
}
