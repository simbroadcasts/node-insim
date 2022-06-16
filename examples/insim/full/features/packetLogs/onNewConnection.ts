import type { IS_NCN } from '../../../../../src/packets';
import { log } from '../../log';

export function onNewConnection(packet: IS_NCN) {
  log.info(`New connection: ${packet.UName} (UCID ${packet.UCID})`);
}
