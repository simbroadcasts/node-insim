import { byte, stringNull } from '../decorators';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import type { PacketDataWithOptionalReqI } from './types';

/**
 * Relay select - packet to select a host, so relay starts sending you data.
 */
export class IR_SEL extends SendablePacket {
  SIZE_MULTIPLIER = 1;

  @byte() readonly Size = 68;
  @byte() readonly Type = PacketType.IRP_SEL;

  /** If non-zero Relay will reply with an {@link IS_VER} packet */
  @byte() ReqI = 0;

  @byte() readonly Zero = 0;

  /** Hostname to receive data from - may be colour code stripped */
  @stringNull(32) HName = '';

  /** Admin password (to gain admin access to host) */
  @stringNull(16) Admin = '';

  /** Spectator password (if host requires it) */
  @stringNull(16) Spec = '';

  constructor(data?: IR_SEL_Data) {
    super();
    this.initialize(data);
  }
}

export type IR_SEL_Data = PacketDataWithOptionalReqI<IR_SEL>;

export enum IR_SEL_ReqI {
  ZERO,

  /** Send back an {@link IS_VER} packet */
  SEND_VERSION,
}
