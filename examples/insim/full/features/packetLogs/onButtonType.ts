import type { IS_BTT } from '../../../../../src/packets';
import { log } from '../../log';

export function onButtonType(packet: IS_BTT) {
  log.info(
    `Button text typed: ClickID ${packet.ClickID}, input text: ${packet.Text}`,
  );
}
