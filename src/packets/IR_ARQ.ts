import { byte } from '../decorators';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import type { PacketDataWithOptionalReqI } from './types';

/**
 * Admin Request
 *
 * To request if we are an admin, send this packet.
 */
export class IR_ARQ extends SendablePacket {
  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.IRP_ARQ;
  @byte() ReqI = 0;
  @byte() readonly Sp0 = 0;

  constructor(data?: IR_ARQ_Data) {
    super();
    this.initialize(data);
  }
}

export type IR_ARQ_Data = PacketDataWithOptionalReqI<IR_ARQ>;
