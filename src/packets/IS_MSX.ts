import { byte, char } from '../utils';
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
  @char(96) Msg = '';

  constructor(data?: IS_MSX_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_MSX_Data = Required<PacketData<IS_MSX>>;
