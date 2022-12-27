import type { IS_MSO } from '../../../../../src/packets';
import { log } from '../../log';

export function onMessageOut(packet: IS_MSO) {
  log.info(`Message received: ${packet.Msg}`);
}
