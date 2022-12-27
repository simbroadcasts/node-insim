import { byte } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type { PenaltyReason, PenaltyValue } from './enums';
import { PacketType } from './enums';

/**
 * PENalty (given or cleared)
 */
export class IS_PEN extends AbstractPacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_PEN;
  @byte() readonly ReqI: 0 = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Old penalty value */
  @byte() OldPen: PenaltyValue = 0;

  /** New penalty value */
  @byte() NewPen: PenaltyValue = 0;

  /** Penalty reason */
  @byte() Reason: PenaltyReason = 0;

  @byte() readonly Sp3: 0 = 0;
}
