import type { IS_III } from '../../../../../src/packets';
import { log } from '../../log';

export function onInSimInfo(packet: IS_III) {
  log.info(`InSim info message received: ${packet.Msg}`);
}
