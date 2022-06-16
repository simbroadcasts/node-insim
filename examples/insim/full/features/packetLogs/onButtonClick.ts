import type { IS_BTC } from '../../../../../src/packets';
import { log } from '../../log';

export function onButtonClick(packet: IS_BTC) {
  log.info(`Button clicked: ClickID ${packet.ClickID}, ReqI ${packet.ReqI}`);
}
