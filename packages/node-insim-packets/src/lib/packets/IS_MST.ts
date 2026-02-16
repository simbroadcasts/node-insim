import { SendablePacket } from '../base/index.js';
import { byte, stringNull } from '../decorators.js';
import { PacketType } from '../enums/index.js';
import type { PacketData } from '../types/index.js';

export const MST_MSG_MAX_LENGTH = 64;

/**
 * MSg Type - send to LFS to type message or command
 */
export class IS_MST extends SendablePacket {
  @byte() readonly Size = 68;
  @byte() readonly Type = PacketType.ISP_MST;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Last byte must be zero */
  @stringNull(MST_MSG_MAX_LENGTH) Msg = '';

  constructor(data?: IS_MST_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_MST_Data = Required<PacketData<IS_MST>>;
