import { byte } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type { PenaltyReason, PenaltyValue } from './enums';
import { PacketType } from './enums';

/**
 * PENalty (given or cleared)
 *
 * On false start or wrong route / restricted area, an IS_PEN packet is sent:
 *
 * - False start: OldPen = 0 / NewPen = {@link PENALTY_30} / Reason = {@link PENR_FALSE_START}
 * - Wrong route: OldPen = 0 / NewPen = {@link PENALTY_45} / Reason = {@link PENR_WRONG_WAY}
 */
export class IS_PEN extends AbstractPacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_PEN;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Old penalty value */
  @byte() OldPen: PenaltyValue = 0;

  /** New penalty value */
  @byte() NewPen: PenaltyValue = 0;

  /** Penalty reason */
  @byte() Reason: PenaltyReason = 0;

  @byte() readonly Sp3 = 0;
}
