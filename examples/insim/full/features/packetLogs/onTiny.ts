import type { IS_TINY } from '../../../../../src/packets';
import { TinyType } from '../../../../../src/packets';
import { log } from '../../log';

export function onTiny(packet: IS_TINY) {
  log.info('Received IS_TINY packet', TinyType[packet.SubT]);
}
