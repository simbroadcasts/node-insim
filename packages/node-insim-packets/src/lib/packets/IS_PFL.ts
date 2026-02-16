import { Packet } from '../base/index.js';
import { byte, word } from '../decorators.js';
import type { PlayerFlags } from '../enums/index.js';
import { PacketType } from '../enums/index.js';

/**
 * Player FLags (help flags changed)
 */
export class IS_PFL extends Packet {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_PFL;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Player flags */
  @word() Flags: PlayerFlags | 0 = 0;

  @word() private readonly Spare = 0;
}
