import { byte, string } from '../utils';
import { AbstractSendablePacket } from './AbstractSendablePacket';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * MSg eXtended - like {@link IS_MST} but longer (not for commands)
 */
export class IS_MSX extends AbstractSendablePacket {
  @byte() readonly Size = 100;
  @byte() readonly Type = PacketType.ISP_MSX;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Last byte must be zero */
  @string(96) Msg = '';

  constructor(data?: IS_MSX_Data) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    if (this.Msg.length >= 96) {
      throw new RangeError(
        'IS_MSX - The "Msg" property must not be longer than 95 characters',
      );
    }

    return super.pack();
  }
}

export type IS_MSX_Data = Required<PacketData<IS_MSX>>;
