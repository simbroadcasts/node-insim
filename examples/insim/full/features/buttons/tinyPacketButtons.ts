import type { IS_BTC } from '../../../../../src/packets';
import {
  ButtonStyle,
  IS_TINY,
  IS_Y_MIN,
  SENDABLE_TINY_TYPES,
  TinyType,
} from '../../../../../src/packets';
import type { InSim } from '../../../../../src/protocols';
import { log } from '../../log';
import { drawButtonList } from '../../ui';
import { BUTTON_HEIGHT, TINY_BUTTON_ID_OFFSET } from './constants';

export function drawTinyPacketButtons(inSim: InSim) {
  drawButtonList(inSim, {
    title: 'IS_TINY',
    leftOffset: 67,
    topOffset: IS_Y_MIN,
    width: 15,
    height: BUTTON_HEIGHT,
    buttons: SENDABLE_TINY_TYPES.map((tinyTypeNumber) => ({
      ReqI: tinyTypeNumber + TINY_BUTTON_ID_OFFSET,
      Text: `${TinyType[tinyTypeNumber]} (${tinyTypeNumber})`,
      BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
      onClick: handleButtonClick,
    })),
  });

  function handleButtonClick(packet: IS_BTC, inSim: InSim) {
    const tinyType = packet.ReqI - TINY_BUTTON_ID_OFFSET;

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
