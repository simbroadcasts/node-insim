import { SendablePacket } from '../base/SendablePacket.js';
import { byte, stringNull } from '../decorators.js';
import { PacketType } from '../enums/PacketType.js';
import type { PacketData } from '../types/PacketData.js';

export const MSX_MSG_MAX_LENGTH = 96;

/**
 * MSg eXtended - like {@link IS_MST} but longer (not for commands)
 */
export class IS_MSX extends SendablePacket {
  @byte() readonly Size = 100;
  @byte() readonly Type = PacketType.ISP_MSX;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Last byte must be zero */
  @stringNull(MSX_MSG_MAX_LENGTH) Msg = '';

  constructor(data?: IS_MSX_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_MSX_Data = Required<PacketData<IS_MSX>>;
