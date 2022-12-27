import { ButtonStyle, IS_MSX, IS_Y_MIN } from '../../../../../../src/packets';
import type { InSim } from '../../../../../../src/protocols';
import { buttonTextWithCaption, drawButton } from '../../../ui';
import { BUTTON_HEIGHT } from '../constants';

export function drawMessageExtendedPacketButton(inSim: InSim) {
  drawButton(inSim, {
    Text: buttonTextWithCaption('Message', 'IS_MSX'),
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN + BUTTON_HEIGHT * 6,
    W: 15,
    H: BUTTON_HEIGHT,
    TypeIn: 95,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onType: ({ inSim, packet }) => {
      inSim.send(
        new IS_MSX({
          Msg: packet.Text,
        }),
      );
    },
  });
}
