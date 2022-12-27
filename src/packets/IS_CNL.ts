import { byte } from '../utils';
import { AbstractPacket } from './base';
import type { LeaveReason } from './enums';
import { PacketType } from './enums';

/**
 * ConN Leave
 */
export class IS_CNL extends AbstractPacket {
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

  @byte() readonly Sp2 = 0;
  @byte() readonly Sp3 = 0;
}
