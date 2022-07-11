import type { IS_PLL } from '../../../../../src/packets';
import { log } from '../../log';

export function onPlayerLeave(packet: IS_PLL) {
  log.info(`Player left: PLID ${packet.PLID}`);
}
