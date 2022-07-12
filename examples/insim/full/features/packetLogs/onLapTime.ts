import type { IS_LAP } from '../../../../../src/packets';
import { log } from '../../log';

export function onLapTime(packet: IS_LAP) {
  log.info(
    `Lap time: ${packet.LTime} (PLID ${packet.PLID}) - ${packet.LapsDone} lap(s) done`,
  );
}
