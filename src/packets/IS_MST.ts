import { byte, string } from '../decorators';
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
  @string(MSG_MAX_LENGTH) Msg = '';

  constructor(data?: IS_MST_Data) {
    super();
    this.initialize(data);
  }

  pack() {
    if (this.Msg.length >= MSG_MAX_LENGTH - 1) {
      this.Msg = this.Msg.substring(0, MSG_MAX_LENGTH - 1);
    }

    return super.pack();
  }
}

export type IS_MST_Data = Required<PacketData<IS_MST>>;
