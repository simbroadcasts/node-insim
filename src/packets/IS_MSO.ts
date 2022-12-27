import { byte, getFormat, log as baseLog, string, unpack } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import type { UserType } from './enums';
import { PacketType } from './enums';

const logError = baseLog.extend('IS_MSO:error');

/**
 * MSg Out - system messages and user messages - variable size
 */
export class IS_MSO extends AbstractPacket {
  private static readonly FIXED_DATA_SIZE = 8;

  @byte() readonly Size = IS_MSO.FIXED_DATA_SIZE;
  @byte() readonly Type = PacketType.ISP_MSO;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Connection's unique id (0 = host) */
  @byte() UCID = 0;

  /** Player's unique id (if zero, use UCID) */
  @byte() PLID = 0;

  /** Set if typed by a user (see {@link UserType})  */
  @byte() UserType: UserType = 0;

  /** First character of the actual text (after player name) */
  @byte() TextStart = 0;

  /** 4, 8, 12... 128 characters - last byte is zero */
  @string(128) Msg = '';

  unpack(buffer: Buffer): this {
    const data = unpack(`<${getFormat(this, 'Size')}`, buffer);

    if (!data || data.length === 0) {
      logError('Failed to read packet size');
      return this;
    }

    const size = data[0] * AbstractPacket.SIZE_MULTIPLIER;
    const msgLength = size - IS_MSO.FIXED_DATA_SIZE;

    super.unpack(buffer, {
      Msg: `${msgLength}s`,
    });

    return this;
  }
}
