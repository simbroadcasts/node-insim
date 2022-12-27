import { byte, string } from '../utils';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * MSg Type - send to LFS to type message or command
 */
export class IS_MST extends SendablePacket {
  @byte() readonly Size = 68;
  @byte() readonly Type = PacketType.ISP_MST;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Last byte must be zero */
  @string(64) Msg = '';

  constructor(data?: IS_MST_Data) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    if (this.Msg.length >= 64) {
      throw new RangeError(
        'IS_MST - The "Msg" property must not be longer than 63 characters',
      );
    }

    return super.pack();
  }
}

export type IS_MST_Data = Required<PacketData<IS_MST>>;
