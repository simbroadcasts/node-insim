import { byte, word } from '../decorators';
import { SendablePacket } from './base';
import type { AICInput } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * AI Control
 */
export class IS_AIC extends SendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_AIC;
  @byte() ReqI = 0;
  @byte() readonly Zero = 0;

  /** Unique ID of AI player to control */
  @byte() PLID = 0;

  /** Select input value to set */
  @byte() Input: AICInput = 0;

  /** Value to set */
  @word() Value = 0;

  constructor(data?: IS_AIC_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_AIC_Data = PacketData<IS_AIC>;
