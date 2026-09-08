import { byte, getFormat, stringNull } from '../decorators';
import { InSimError } from '../errors';
import { unpack } from '../lfspack';
import { Packet } from './base';
import { PacketType } from './enums';

/**
 * MSg Out - system messages and user messages - variable size
 *
 * NOTE: Typing "/o MESSAGE" into LFS will send an IS_MSO with {@link UserType} = {@link MSO_O}
 */
export class IS_MSO extends Packet {
  private static readonly FIXED_DATA_SIZE = 8;

  @byte() readonly Size = IS_MSO.FIXED_DATA_SIZE;
  @byte() readonly Type = PacketType.ISP_MSO;
  @byte() readonly ReqI = 0;

  /** Bits 0-3 (MSOData & 0x0f) - code page of the message (see {@link CodePage}) */
  @byte() MSOData = 0;

  /** Connection's unique id (0 = host) */
  @byte() UCID = 0;

  /** Player's unique id (if zero, use UCID) */
  @byte() PLID = 0;

  /** Set if typed by a user (see {@link UserType})  */
  @byte() UserType: UserType = 0;

  /** First character of the actual text (after player name) */
  @byte() TextStart = 0;

  /** 4, 8, 12... 128 characters - last byte is zero */
  @stringNull(128) Msg = '';

  unpack(buffer: Uint8Array<ArrayBuffer>): this {
    const data = unpack(`<${getFormat(this, 'Size')}`, buffer.buffer);

    if (!data || data.length === 0) {
      throw new InSimError('IS_MSO - Unpacked no data from buffer');
    }

    const size = (data[0] as number) * this.SIZE_MULTIPLIER;
    const msgLength = size - IS_MSO.FIXED_DATA_SIZE;

    super.unpack(buffer, {
      Msg: `${msgLength}s`,
    });

    const playerNameUnpacked = unpack(
      `<${this.TextStart}s`,
      buffer.buffer,
      IS_MSO.FIXED_DATA_SIZE,
    );

    if (
      playerNameUnpacked !== null &&
      Array.isArray(playerNameUnpacked[0]) &&
      playerNameUnpacked[0].length === 2
    ) {
      const [, playerName] = playerNameUnpacked[0];
      this.TextStart = playerName.length;
    }

    return this;
  }
}

export enum UserType {
  /** System message */
  MSO_SYSTEM,

  /** Normal visible user message */
  MSO_USER,

  /** hidden message starting with special prefix (see {@link IS_ISI}) */
  MSO_PREFIX,

  /** Hidden message typed on local pc with /o command */
  MSO_O,
}

/**
 * LFS code page letter and Windows code page identifiers used by {@link IS_MSO.MSOData}
 */
export enum CodePage {
  /** L - 1252 - Latin 1 */
  LID_LATIN,

  /** E - 1250 - Central European */
  LID_EUROPEAN,

  /** T - 1254 - Turkish */
  LID_TURKISH,

  /** B - 1257 - Baltic */
  LID_BALTIC,

  /** J - 932 - Japanese */
  LID_JAPANESE,

  /** C - 1251 - Cyrillic */
  LID_CYRILLIC,

  /** G - 1253 - Greek */
  LID_GREEK,

  /** H - 950 - Traditional Chinese */
  LID_TRADITIONAL_CHINESE,

  /** S - 936 - Simplified Chinese */
  LID_SIMPLIFIED_CHINESE,

  /** K - 949 - Korean */
  LID_KOREAN,

  /** Number of code pages */
  LID_NUM_CP,
}
