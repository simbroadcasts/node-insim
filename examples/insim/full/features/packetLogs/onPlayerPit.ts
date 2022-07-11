import type { IS_PLP } from '../../../../../src/packets';
import { log } from '../../log';

export function onPlayerPit(packet: IS_PLP) {
  log.info(`Player pitted: PLID ${packet.PLID}`);
}
