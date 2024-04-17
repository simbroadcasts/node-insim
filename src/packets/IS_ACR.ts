import { byte, getFormat, stringNull } from '../decorators';
import { InSimError } from '../errors';
import { unpack } from '../lfspack';
import { Packet } from './base';
import type { AdminCommandResult } from './enums';
import { PacketType } from './enums';

/**
 * Admin Command Report - a user typed an admin command - variable size
 */
export class IS_ACR extends Packet {
  private static readonly FIXED_DATA_SIZE = 8;

  /** 12, 16, 20... 72 depending on Text */
  @byte() readonly Size = 12;
  @byte() readonly Type = PacketType.ISP_ACR;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Connection's unique id (0 = host) */
  @byte() UCID = 0;

  /** Set if user is an admin */
  @byte() Admin: 0 | 1 = 0;

  /** 1 - processed / 2 - rejected / 3 - unknown command */
  @byte() Result: AdminCommandResult | 0 = 0;

  @byte() Sp3 = 0;

  /** 4, 8, 12... 64 characters - last byte is zero */
  @stringNull(64) Text = '';

  unpack(buffer: Uint8Array): this {
    const data = unpack(`<${getFormat(this, 'Size')}`, buffer.buffer);

    if (!data || data.length === 0) {
      throw new InSimError('IS_ACR - Unpacked no data from buffer');
    }

    const size = (data[0] as number) * this.SIZE_MULTIPLIER;
    const textLength = size - IS_ACR.FIXED_DATA_SIZE;

    super.unpack(buffer, {
      Text: `${textLength}s`,
    });

    return this;
  }
}
