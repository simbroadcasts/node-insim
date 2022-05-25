import { IS_ISI_ReqI, PacketType } from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { drawButtonStyles } from './buttonStyles';
import { drawSmallPacketButtons } from './smallPacketButtons';
import { drawStateButtons } from './stateButtons';
import { drawStateFlagsButtons } from './stateFlagsButtons';
import { drawTinyPacketButtons } from './tinyPacketButtons';

export function drawTestButtons(inSim: InSim) {
  inSim.on(PacketType.ISP_VER, (packet) => {
    if (packet.ReqI === IS_ISI_ReqI.SEND_VERSION) {
      drawStateButtons(inSim);
      drawStateFlagsButtons(inSim);
      drawButtonStyles(inSim);
      drawTinyPacketButtons(inSim);
      drawSmallPacketButtons(inSim);
    }
  });
}
