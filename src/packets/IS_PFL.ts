import { byte, word } from '../utils';
import { Packet } from './base';
import type { PlayerFlags } from './enums';
import { PacketType } from './enums';

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
  @word() Flags: PlayerFlags = 0;

  @word() private readonly Spare = 0;
}
