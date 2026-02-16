import { Packet } from '../base/index.js';
import { byte } from '../decorators.js';
import { PacketType } from '../enums/index.js';

/**
 * ConN Leave
 */
export class IS_CNL extends Packet {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_CNL;

  /** 0 */
  @byte() readonly ReqI = 0;

  /** Unique id of the connection which left */
  @byte() UCID = 0;

  /** Leave reason (see below) */
  @byte() Reason: LeaveReason = 0;

  /** Number of connections including host */
  @byte() Total = 0;

  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;
}

export enum LeaveReason {
  /** None */
  LEAVR_DISCO,

  /** Timed out */
  LEAVR_TIMEOUT,

  /** Lost connection */
  LEAVR_LOSTCONN,

  /** Kicked */
  LEAVR_KICKED,

  /** Banned */
  LEAVR_BANNED,

  /** Security */
  LEAVR_SECURITY,

  /** Cheat protection warning */
  LEAVR_CPW,

  /** Out of sync with host */
  LEAVR_OOS,

  /** Join OOS (initial sync failed) */
  LEAVR_JOOS,

  /** Invalid packet */
  LEAVR_HACK,
}
