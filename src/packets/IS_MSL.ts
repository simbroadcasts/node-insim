import { byte, stringNull } from '../decorators';
import { SendablePacket } from './base';
import type { MessageSound } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

export const MSL_MSG_MAX_LENGTH = 128;

/**
 * MSg Local - message to appear on local computer only
 */
export class IS_MSL extends SendablePacket {
  @byte() readonly Size = 132;
  @byte() readonly Type = PacketType.ISP_MSL;
  @byte() readonly ReqI = 0;

  /** Sound effect */
  @byte() Sound: MessageSound = 0;

  /** Last byte must be zero */
  @stringNull(MSL_MSG_MAX_LENGTH) Msg = '';

  constructor(data?: IS_MSL_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_MSL_Data = PacketData<IS_MSL>;
