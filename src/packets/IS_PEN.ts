import { byte } from '../decorators';
import { Packet } from './base';
import type { PenaltyValue } from './enums';
import { PacketType } from './enums';

/**
 * PENalty (given or cleared)
 *
 * On false start or wrong route / restricted area, an IS_PEN packet is sent:
 *
 * - False start: OldPen = 0 / NewPen = {@link PENALTY_30} / Reason = {@link PENR_FALSE_START}
 * - Wrong route: OldPen = 0 / NewPen = {@link PENALTY_45} / Reason = {@link PENR_WRONG_WAY}
 */
export class IS_PEN extends Packet {
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

  @byte() private readonly Sp3 = 0;
}

export enum PenaltyReason {
  /** Unknown or cleared penalty */
  PENR_UNKNOWN,

  /** Penalty given by admin */
  PENR_ADMIN,

  /** Wrong way driving */
  PENR_WRONG_WAY,

  /** Starting before green light */
  PENR_FALSE_START,

  /** Speeding in pit lane */
  PENR_SPEEDING,

  /** Stop-go pit stop too short */
  PENR_STOP_SHORT,

  /** Compulsory stop is too late */
  PENR_STOP_LATE,
}
