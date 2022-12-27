import type { IS_ISM } from '../../../../../src/packets';
import { MultiplayerHostMode } from '../../../../../src/packets';
import { log } from '../../log';

export function onMultiplayer(packet: IS_ISM) {
  if (packet.Host === MultiplayerHostMode.GUEST) {
    log.info('Multiplayer host joined:', packet.HName);
  } else if (packet.Host === MultiplayerHostMode.HOST) {
    log.info('Multiplayer host started', packet.HName);
  }
}
