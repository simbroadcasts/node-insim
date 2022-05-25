import type { IS_BTC } from '../../../../../src/packets';
import { log } from '../../log';

export function onButtonClick(packet: IS_BTC) {
  log.info(`Received IS_BTC packet - ClickID ${packet.ClickID}`);
}
