import { PacketType } from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { onButtonClick } from './onButtonClick';
import { onButtonType } from './onButtonType';
import { onCamPosPack } from './onCamPosPack';
import { onCarReset } from './onCarReset';
import { onConnectionLeave } from './onConnectionLeave';
import { onConnectionPlayerRename } from './onConnectionPlayerRename';
import { onLapTime } from './onLapTime';
import { onMessageOut } from './onMessageOut';
import { onMultiplayer } from './onMultiplayer';
import { onNewConnection } from './onNewConnection';
import { onNewPlayer } from './onNewPlayer';
import { onPlayerLeave } from './onPlayerLeave';
import { onPlayerPit } from './onPlayerPit';
import { onSmall } from './onSmall';
import { onState } from './onState';
import { onTiny } from './onTiny';
import { onVersion } from './onVersion';

export function logPackets(inSim: InSim) {
  inSim.on(PacketType.ISP_VER, onVersion);
  inSim.on(PacketType.ISP_TINY, onTiny);
  inSim.on(PacketType.ISP_SMALL, onSmall);
  inSim.on(PacketType.ISP_CPP, onCamPosPack);
  inSim.on(PacketType.ISP_ISM, onMultiplayer);
  inSim.on(PacketType.ISP_MSO, onMessageOut);
  inSim.on(PacketType.ISP_STA, onState);
  inSim.on(PacketType.ISP_NCN, onNewConnection);
  inSim.on(PacketType.ISP_CNL, onConnectionLeave);
  inSim.on(PacketType.ISP_CPR, onConnectionPlayerRename);
  inSim.on(PacketType.ISP_NPL, onNewPlayer);
  inSim.on(PacketType.ISP_PLP, onPlayerPit);
  inSim.on(PacketType.ISP_PLL, onPlayerLeave);
  inSim.on(PacketType.ISP_LAP, onLapTime);
  inSim.on(PacketType.ISP_CRS, onCarReset);
  inSim.on(PacketType.ISP_BTC, onButtonClick);
  inSim.on(PacketType.ISP_BTT, onButtonType);
}
