import { byte, char, createLog, getFormat, unpack } from '../utils';
import { BasePacket } from './BasePacket';
import type { UserValues } from './enums';
import { PacketType } from './enums';

const log = createLog('IS_MSO');

/**
 * MSg Out - system messages and user messages - variable size
 */
export class IS_MSO extends BasePacket {
  private static readonly FIXED_DATA_SIZE = 8;

  @byte() readonly Size = IS_MSO.FIXED_DATA_SIZE;
  @byte() readonly Type = PacketType.ISP_MSO;
  @byte() readonly ReqI: 0 = 0;
  @byte() readonly Zero: 0 = 0;

  /** Connection's unique id (0 = host) */
  @byte() UCID = 0;

  /** Player's unique id (if zero, use UCID) */
  @byte() PLID = 0;

  /** Set if typed by a user (see {@link UserValues})  */
  @byte() UserType: UserValues = 0;

  /** First character of the actual text (after player name) */
  @byte() TextStart = 0;

  /** 4, 8, 12... 128 characters - last byte is zero */
  @char(128) Msg = '';

  unpack(buffer: Buffer): this {
    const data = unpack(`<${getFormat(this, 'Size')}`, buffer);

    if (!data || data.length === 0) {
      log.error('Failed to read packet size');
      return this;
    }

    const size = data[0] * BasePacket.SIZE_MULTIPLIER;
    const msgLength = size - IS_MSO.FIXED_DATA_SIZE;

    super.unpack(buffer, {
      Msg: `${msgLength}s`,
    });

    return this;
  }
}
