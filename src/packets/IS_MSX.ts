import { byte, string } from '../utils';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import type { PacketData } from './types';

const MSG_MAX_LENGTH = 96;

/**
 * MSg eXtended - like {@link IS_MST} but longer (not for commands)
 */
export class IS_MSX extends SendablePacket {
  @byte() readonly Size = 100;
  @byte() readonly Type = PacketType.ISP_MSX;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Last byte must be zero */
  @string(MSG_MAX_LENGTH) Msg = '';

  constructor(data?: IS_MSX_Data) {
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

export type IS_MSX_Data = Required<PacketData<IS_MSX>>;
