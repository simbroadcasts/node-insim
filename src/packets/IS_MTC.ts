import { byte, char } from '../utils';
import { BaseSendablePacket } from './BaseSendablePacket';
import { PacketType } from './enums';
import type { MessageSound } from './enums/MessageSound';
import type { PacketData } from './types';

/**
 * Msg To Connection - hosts only - send to a connection / a player / all
 */
export class IS_MTC extends BaseSendablePacket {
  private static readonly FIXED_DATA_SIZE = 8;
  private static readonly TEXT_MAX_LENGTH = 128;

  @byte() Size = IS_MTC.FIXED_DATA_SIZE;
  @byte() readonly Type = PacketType.ISP_MTC;
  @byte() ReqI = 0;

  /** Sound effect */
  @byte() Sound: MessageSound = 0;

  /** Connection's unique id (0 = host / 255 = all) */
  @byte() UCID = 0;

  /** Player's unique id (if zero, use UCID) */
  @byte() PLID = 0;

  @byte() readonly Sp2: 0 = 0;
  @byte() readonly Sp3: 0 = 0;

  /** Up to 128 characters of text - last byte must be zero */
  @char(0) Text = '';

  constructor(data?: IS_MTC_Data) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    const multiple = 4;
    const length = this.Text.length;
    const textSize = Math.min(
      length + (multiple - (length % multiple)),
      IS_MTC.TEXT_MAX_LENGTH,
    );
    this.Size = IS_MTC.FIXED_DATA_SIZE + textSize;

    return super.pack({
      Text: `${textSize}s`,
    });
  }
}

export type IS_MTC_Data = PacketData<IS_MTC>;
