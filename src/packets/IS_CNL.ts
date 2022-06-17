import { byte } from '../utils';
import { BasePacket } from './BasePacket';
import type { LeaveReason } from './enums';
import { PacketType } from './enums';

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
  @byte() Reason: LeaveReason = 0;

  /** Number of connections including host */
  @byte() Total = 0;

  @byte() readonly Sp2: 0 = 0;

  @byte() readonly Sp3: 0 = 0;

  constructor(data?: Buffer) {
    super();
    this.initialize(data);
  }
}
