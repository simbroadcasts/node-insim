import { byte, stringNull } from '../decorators';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import type { PacketData } from './types';

const MSG_MAX_LENGTH = 64;

/**
 * MSg Type - send to LFS to type message or command
 */
export class IS_MST extends SendablePacket {
  @byte() readonly Size = 68;
  @byte() readonly Type = PacketType.ISP_MST;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Last byte must be zero */
  @stringNull(MSG_MAX_LENGTH) Msg = '';

  constructor(data?: IS_MST_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_MST_Data = Required<PacketData<IS_MST>>;
