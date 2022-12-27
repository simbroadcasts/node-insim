import { byte } from '../utils';
import { BasePacket } from './BasePacket';
import type { PitLaneFact } from './enums';
import { PacketType } from './enums';

/**
 * Pit LAne
 */
export class IS_PLA extends BasePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_PLA;
  @byte() readonly ReqI: 0 = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Pit lane fact */
  @byte() Fact: PitLaneFact = 0;

  @byte() Sp1: 0 = 0;
  @byte() Sp2: 0 = 0;
  @byte() Sp3: 0 = 0;
}
