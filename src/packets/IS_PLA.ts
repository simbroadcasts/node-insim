import { byte } from '../utils';
import { Packet } from './base';
import type { PitLaneFact } from './enums';
import { PacketType } from './enums';

/**
 * Pit LAne
 */
export class IS_PLA extends Packet {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_PLA;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Pit lane fact */
  @byte() Fact: PitLaneFact = 0;

  @byte() private readonly Sp1 = 0;
  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;
}
