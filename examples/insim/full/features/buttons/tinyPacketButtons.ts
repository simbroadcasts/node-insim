import type { IS_BTC } from '../../../../../src/packets';
import {
  ButtonStyle,
  IS_TINY,
  PacketType,
  SENDABLE_TINY_TYPES,
  TinyType,
} from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { TINY_BUTTON_CLICK_ID_OFFSET } from '../../constants';
import { log } from '../../log';
import { drawButtonList } from '../../ui';

export function drawTinyPacketButtons(inSim: InSim) {
  drawButtonList(inSim, {
    title: 'IS_TINY',
    titleClickId: TINY_BUTTON_CLICK_ID_OFFSET - 1,
    leftOffset: 70,
    topOffset: 10,
    width: 20,
    height: 4,
    buttons: SENDABLE_TINY_TYPES.map((tinyTypeNumber) => ({
      ClickID: tinyTypeNumber + TINY_BUTTON_CLICK_ID_OFFSET,
      Text: `${TinyType[tinyTypeNumber]} (${tinyTypeNumber})`,
      BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    })),
  });

  inSim.on(PacketType.ISP_BTC, onButtonClick);
}

function onButtonClick(packet: IS_BTC, inSim: InSim) {
  if (
    packet.ClickID >= TINY_BUTTON_CLICK_ID_OFFSET &&
    packet.ClickID <=
      TINY_BUTTON_CLICK_ID_OFFSET + Math.max(...SENDABLE_TINY_TYPES)
  ) {
    const tinyType = packet.ClickID - TINY_BUTTON_CLICK_ID_OFFSET;

    if (SENDABLE_TINY_TYPES.includes(tinyType)) {
      log.info(`Send IS_TINY - ${TinyType[tinyType]} (${tinyType})`);
      inSim.send(
        new IS_TINY({
          ReqI: 2,
          SubT: tinyType,
        }),
      );
    }
  }
}
