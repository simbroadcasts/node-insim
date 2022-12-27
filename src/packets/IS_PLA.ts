import { byte } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type { PitLaneFact } from './enums';
import { PacketType } from './enums';

/**
 * Pit LAne
 */
export class IS_PLA extends AbstractPacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_PLA;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Pit lane fact */
  @byte() Fact: PitLaneFact = 0;

  @byte() readonly Sp1 = 0;
  @byte() readonly Sp2 = 0;
  @byte() readonly Sp3 = 0;
}