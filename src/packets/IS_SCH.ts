import { BaseSendablePacket } from './BaseSendablePacket';
import { byte } from './decorators';
import { PacketType } from './packetTypes';

/**
 * Single CHaracter
 *
 *
 * You can send individual key presses to LFS with the IS_SCH packet.
 * For standard keys (e.g. V and H) you should send a capital letter.
 * This does not work with some keys like F keys, arrows or CTRL keys.
 * You can also use {@link IS_MST} with the /press /shift /ctrl /alt commands.
 */
export class IS_SCH extends BaseSendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_SCH;

  @byte() ReqI: 0 = 0;

  @byte() readonly Zero: 0 = 0;

  /** Key to press */
  @byte() CharB = 0;

  /** bit 0: Shift / bit 1: Ctrl */
  @byte() Flags: KeyFlags = 0;

  @byte() readonly Spare2: 0 = 0;

  @byte() readonly Spare3: 0 = 0;

  constructor(data?: IS_SCH_Data | Buffer) {
    super();
    this.initialize(data);
  }
}

export type IS_SCH_Data = Partial<IS_SCH>;

export enum KeyFlags {
  /** Shift key */
  SHIFT = 1,

  /** Ctrl key */
  CTRL = 2,
}
