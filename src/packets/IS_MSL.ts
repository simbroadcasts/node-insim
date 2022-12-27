import { byte, string } from '../utils';
import { AbstractSendablePacket } from './base';
import type { MessageSound } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * MSg Local - message to appear on local computer only
 */
export class IS_MSL extends AbstractSendablePacket {
  @byte() readonly Size = 132;
  @byte() readonly Type = PacketType.ISP_MSL;
  @byte() readonly ReqI = 0;

  /** Sound effect */
  @byte() Sound: MessageSound = 0;

  /** Last byte must be zero */
  @string(128) Msg = '';

  constructor(data?: IS_MSL_Data) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    if (this.Msg.length >= 128) {
      throw new RangeError(
        'IS_MSL - The "Msg" property must not be longer than 127 characters',
      );
    }

    return super.pack();
  }
}

export type IS_MSL_Data = PacketData<IS_MSL>;
