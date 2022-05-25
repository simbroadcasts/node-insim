import type { IS_SMALL } from '../../../../../src/packets';
import { SmallType } from '../../../../../src/packets';
import { log } from '../../log';

export function onSmall(packet: IS_SMALL) {
  log.info(
    `Received IS_SMALL packet ${SmallType[packet.SubT]}: ${packet.UVal}`,
  );
}
