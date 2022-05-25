import { IS_ISI_ReqI, PacketType } from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { drawButtonVariants } from './buttonVariants';
import { drawSmallPacketButtons } from './smallPacketButtons';
import { drawTinyPacketButtons } from './tinyPacketButtons';

export function drawTestButtons(inSim: InSim) {
  inSim.on(PacketType.ISP_VER, (packet) => {
    if (packet.ReqI === IS_ISI_ReqI.SEND_VERSION) {
      drawButtonVariants(inSim);
      drawTinyPacketButtons(inSim);
      drawSmallPacketButtons(inSim);
    }
  });
}
