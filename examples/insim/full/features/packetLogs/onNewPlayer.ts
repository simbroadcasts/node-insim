import type { IS_NPL } from '../../../../../src/packets';
import { log } from '../../log';

export function onNewPlayer(packet: IS_NPL) {
  log.info(
    `New player: ${packet.PName} (PLID ${packet.PLID}, UCID ${packet.UCID})`,
  );
}
