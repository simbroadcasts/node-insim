import type { IS_CPR } from '../../../../../src/packets';
import { log } from '../../log';

export function onConnectionPlayerRename(packet: IS_CPR) {
  log.info(`Player renamed: ${packet.PName} (UCID ${packet.UCID})`);
}
