import { byte } from '../decorators';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import type { PacketDataWithOptionalReqI } from './types';

/**
 * HostList Request
 *
 * To request a host list from the Relay, send this packet.
 */
export class IR_HLR extends SendablePacket {
  SIZE_MULTIPLIER = 1;

  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.IRP_HLR;
  @byte() ReqI = 0;
  @byte() readonly Sp0 = 0;

  constructor(data?: IR_HLR_Data) {
    super();
    this.initialize(data);
  }
}

export type IR_HLR_Data = PacketDataWithOptionalReqI<IR_HLR>;
