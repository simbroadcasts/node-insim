import { byte, struct } from '../utils';
import { SendablePacket } from './base';
import type { JRRAction } from './enums';
import { PacketType } from './enums';
import { ObjectInfo } from './ObjectInfo';
import type { PacketData } from './types';

/**
 * Join Request Reply - send one of these back to LFS in response to a join request
 *
 * Set the {@link ISF_REQ_JOIN} flag in the {@link IS_ISI} to receive join requests
 * A join request is seen as an {@link IS_NPL} packet with ZERO in the NumP field
 * An immediate response (e.g. within 1 second) is required using an {@link IS_JRR} packet
 *
 * In this case, PLID must be zero and {@link JRRAction} must be {@link JRR_REJECT} or
 * {@link JRR_SPAWN}.
 * If you allow the join and it is successful you will then get a normal {@link IS_NPL} with
 * NumP set.
 * You can also specify the start position of the car using the StartPos structure.
 *
 * {@link IS_JRR} can also be used to move an existing car to a different location.
 * In this case, {@link PLID} must be set, {@link JRRAction} must be {@link JRR_RESET} or
 * higher and StartPos must be set.

 */
export class IS_JRR extends SendablePacket {
  @byte() readonly Size = 16;
  @byte() readonly Type = PacketType.ISP_JRR;
  @byte() readonly ReqI = 0;

  /** ZERO when this is a reply to a join request - SET to move a car */
  @byte() PLID = 0;

  /** Set when this is a reply to a join request - ignored when moving a car */
  @byte() UCID = 0;

  /** 1 - allow / 0 - reject (should send message to user) */
  @byte() JRRAction: JRRAction = 0;

  @byte() Sp2 = 0;
  @byte() Sp3 = 0;

  /**
   * 0: use default start point / Flags = 0x80: set start point
   *
   * To use default start point, StartPos should be filled with zero values.
   *
   * To specify a start point, StartPos X, Y, Zbyte and Heading should be filled like
   * an autocross start position, Flags should be 0x80 and Index should be zero
   **/
  @struct(ObjectInfo) StartPos: ObjectInfo = new ObjectInfo();

  constructor(data?: IS_JRR_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_JRR_Data = PacketData<IS_JRR>;
