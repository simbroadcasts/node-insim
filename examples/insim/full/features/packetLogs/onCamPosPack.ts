import type { IS_CPP } from '../../../../../src/packets';
import { log } from '../../log';

export function onCamPosPack(packet: IS_CPP) {
  log.info(
    `Camera position requested: PLID ${packet.ViewPLID}, FOV ${packet.FOV}`,
  );
}
