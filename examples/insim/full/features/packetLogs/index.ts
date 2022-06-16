import { PacketType } from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { onButtonClick } from './onButtonClick';
import { onButtonType } from './onButtonType';
import { onConnectionLeave } from './onConnectionLeave';
import { onNewConnection } from './onNewConnection';
import { onSmall } from './onSmall';
import { onState } from './onState';
import { onTiny } from './onTiny';
import { onVersion } from './onVersion';

export function logPackets(inSim: InSim) {
  inSim.on(PacketType.ISP_VER, onVersion);
  inSim.on(PacketType.ISP_TINY, onTiny);
  inSim.on(PacketType.ISP_SMALL, onSmall);
  inSim.on(PacketType.ISP_BTC, onButtonClick);
  inSim.on(PacketType.ISP_BTT, onButtonType);
  inSim.on(PacketType.ISP_STA, onState);
  inSim.on(PacketType.ISP_NCN, onNewConnection);
  inSim.on(PacketType.ISP_CNL, onConnectionLeave);
}
