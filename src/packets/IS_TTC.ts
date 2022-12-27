import { byte } from '../utils';
import { AbstractSendablePacket } from './base';
import type { TargetToConnectionType } from './enums';
import { PacketType } from './enums';
import type { PacketDataWithRequiredReqI } from './types';

/**
 * General purpose 8 byte packet (Target To Connection)
 *
 * To request an {@link IS_AXM} for a connection's layout editor selection send this
 * {@link IS_TTC}:
 *
 * - ReqI: non-zero         (returned in the reply)
 * - SubT: {@link TTC_SEL}  (request an {@link IS_AXM} for the current selection)
 * - UCID: connection       (0 = local / non-zero = guest)
 */
export class IS_TTC extends AbstractSendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_TTC;

  /** 0 unless it is an info request or a reply to an info request */
  @byte() ReqI = 0;

  /** Subtype */
  @byte() SubT: TargetToConnectionType = 0;

  /** Connection's unique id (0 = local) */
  @byte() UCID = 0;

  /** May be used in various ways depending on SubT */
  @byte() B1 = 0;

  /** May be used in various ways depending on SubT */
  @byte() B2 = 0;

  /** May be used in various ways depending on SubT */
  @byte() B3 = 0;

  constructor(data?: IS_TTC_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_TTC_Data = PacketDataWithRequiredReqI<IS_TTC>;
