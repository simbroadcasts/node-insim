import { byte, word } from '../utils';
import { BasePacket } from './BasePacket';
import type { PlayerFlags } from './enums';
import { PacketType } from './enums';

/**
 * Player FLags (help flags changed)
 */
export class IS_PFL extends BasePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_PFL;
  @byte() readonly ReqI: 0 = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Player flags */
  @word() Flags: PlayerFlags = 0;

  @word() readonly Spare: 0 = 0;
}
