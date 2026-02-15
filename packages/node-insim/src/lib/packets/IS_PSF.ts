import { byte, unsigned } from '../decorators';
import { Packet } from './base';
import { PacketType } from './enums';

/**
 * Pit Stop Finished
 */
export class IS_PSF extends Packet {
  @byte() readonly Size = 12;
  @byte() readonly Type = PacketType.ISP_PSF;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Stop time (ms) */
  @unsigned() STime = 0;

  @unsigned() private readonly Spare = 0;
}
