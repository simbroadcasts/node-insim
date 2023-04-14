import unicodeToLfs from 'unicode-to-lfs';

import { byte, stringNull } from '../decorators';
import { SendablePacket } from './base';
import type { MessageSound } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

const TEXT_MAX_LENGTH = 128;

/**
 * Msg To Connection - hosts only - send to a connection / a player / all
 */
export class IS_MTC extends SendablePacket {
  private static readonly FIXED_DATA_SIZE = 8;

  @byte() Size = IS_MTC.FIXED_DATA_SIZE;
  @byte() readonly Type = PacketType.ISP_MTC;
  @byte() ReqI = 0;

  /** Sound effect */
  @byte() Sound: MessageSound = 0;

  /** Connection's unique id (0 = host / 255 = all) */
  @byte() UCID = 0;

  /** Player's unique id (if zero, use UCID) */
  @byte() PLID = 0;

  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;

  /** Up to 128 characters of text - last byte must be zero */
  @stringNull(TEXT_MAX_LENGTH) Text = '';

  constructor(data?: IS_MTC_Data) {
    super();
    this.initialize(data);
  }

  pack() {
    const multiple = 4;
    const encodedText = unicodeToLfs(this.Text);
    const length = encodedText.length;

    const textSize = Math.min(
      length + (multiple - (length % multiple)),
      TEXT_MAX_LENGTH,
    );
    this.Size = IS_MTC.FIXED_DATA_SIZE + textSize;

    return super.pack({
      Text: `${textSize}S`,
    });
  }
}

export type IS_MTC_Data = PacketData<IS_MTC>;
