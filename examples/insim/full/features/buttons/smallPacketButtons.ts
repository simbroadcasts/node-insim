import type { IS_BTT } from '../../../../../src/packets';
import {
  ButtonStyle,
  IS_SMALL,
  PacketType,
  SENDABLE_SMALL_TYPES,
  SmallType,
} from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { SMALL_BUTTON_CLICK_ID_OFFSET } from '../../constants';
import { log } from '../../log';
import { buttonTextWithCaption, drawButtonList } from '../../ui';

export function drawSmallPacketButtons(inSim: InSim) {
  drawButtonList(inSim, {
    title: 'IS_SMALL',
    titleClickId: SMALL_BUTTON_CLICK_ID_OFFSET,
    leftOffset: 90,
    topOffset: 10,
    width: 20,
    height: 4,
    buttons: SENDABLE_SMALL_TYPES.map((smallTypeNumber) => {
      const text = `${SmallType[smallTypeNumber]} (${smallTypeNumber})`;

      return {
        ClickID: smallTypeNumber + SMALL_BUTTON_CLICK_ID_OFFSET,
        Text: buttonTextWithCaption(`${text} - UVal`, text),
        BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
        TypeIn: 95,
      };
    }),
  });

  inSim.on(PacketType.ISP_BTT, onButtonType);
}

function onButtonType(packet: IS_BTT, inSim: InSim) {
  if (
    packet.ClickID >= SMALL_BUTTON_CLICK_ID_OFFSET &&
    packet.ClickID <=
      SMALL_BUTTON_CLICK_ID_OFFSET + Math.max(...SENDABLE_SMALL_TYPES)
  ) {
    const smallType = packet.ClickID - SMALL_BUTTON_CLICK_ID_OFFSET;

    if (SENDABLE_SMALL_TYPES.includes(smallType)) {
      const uVal = parseInt(packet.Text, 10);

      if (isNaN(uVal)) {
        log.warn('UVal must be a number');
        return;
      }

      log.info(`Send IS_SMALL - ${SmallType[smallType]} (${smallType})`);
      inSim.send(
        new IS_SMALL({
          ReqI: 2,
          SubT: smallType,
          UVal: uVal,
        }),
      );
    }
  }
}
