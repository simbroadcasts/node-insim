import { byte, unsigned } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import { PacketType } from './enums';

/**
 * Pit Stop Finished
 */
export class IS_PSF extends AbstractPacket {
  @byte() readonly Size = 12;
  @byte() readonly Type = PacketType.ISP_PSF;
  @byte() readonly ReqI: 0 = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Stop time (ms) */
  @unsigned() STime = 0;

  @unsigned() readonly Spare: 0 = 0;
}
