import { BasePacket } from './BasePacket';
import { byte } from './decorators';
import { PacketType } from './packetTypes';

/**
 * ConN Leave
 */
export class IS_CNL extends BasePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_CNL;

  /** 0 */
  @byte() ReqI: 0 = 0;

  /** Unique id of the connection which left */
  @byte() UCID = 0;

  /** Leave reason (see below) */
  @byte() Reason: LeaveReasons = 0;

  /** Number of connections including host */
  @byte() Total = 0;

  @byte() readonly Sp2: 0 = 0;

  @byte() readonly Sp3: 0 = 0;

  constructor(data?: Buffer) {
    super();
    this.initialize(data);
  }
}

export enum LeaveReasons {
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

  LEAVR_NUM,
}
