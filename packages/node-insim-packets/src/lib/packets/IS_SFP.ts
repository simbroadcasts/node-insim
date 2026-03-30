import { SendablePacket } from '../base/SendablePacket.js';
import { byte, word } from '../decorators.js';
import { PacketType } from '../enums/PacketType.js';
import type { StateFlags } from '../enums/StateFlags.js';
import type { PacketData } from '../types/PacketData.js';

/**
 * State Flags Pack
 */
export class IS_SFP extends SendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_SFP;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** The state to set */
  @word() Flag: SendableStateFlags | 0 = 0;

  /** 0 = off / 1 = on */
  @byte() OffOn: 0 | 1 = 0;

  @byte() private readonly Sp3 = 0;

  constructor(data?: IS_SFP_Data) {
    super();
    this.initialize(data);
  }
}

export type SendableStateFlags =
  | StateFlags.ISS_SHIFTU_NO_OPT
  | StateFlags.ISS_SHOW_2D
  | StateFlags.ISS_MPSPEEDUP
  | StateFlags.ISS_SOUND_MUTE;

export type IS_SFP_Data = PacketData<IS_SFP>;
