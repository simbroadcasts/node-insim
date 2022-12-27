import { byte } from '../utils';
import { AbstractSendablePacket } from './AbstractSendablePacket';
import type { CharacterModifiers } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * Single CHaracter
 *
 *
 * You can send individual key presses to LFS with the IS_SCH packet.
 * For standard keys (e.g. V and H) you should send a capital letter.
 * This does not work with some keys like F keys, arrows or CTRL keys.
 * You can also use {@link IS_MST} with the /press /shift /ctrl /alt commands.
 */
export class IS_SCH extends AbstractSendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_SCH;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Key to press */
  @byte() CharB = 0;

  /** Bit 0: Shift / bit 1: Ctrl */
  @byte() Flags: CharacterModifiers = 0;

  @byte() readonly Spare2 = 0;
  @byte() readonly Spare3 = 0;

  constructor(data?: IS_SCH_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_SCH_Data = Pick<PacketData<IS_SCH>, 'CharB' | 'Flags'>;
