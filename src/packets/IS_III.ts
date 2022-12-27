import { InSimError } from '../protocols/InSim/InSimEvents';
import { byte, getFormat, string, unpack } from '../utils';
import { Packet } from './base';
import { PacketType } from './enums';

/**
 * InsIm Info - /i message from user to host's InSim - variable size
 */
export class IS_III extends Packet {
  private static readonly FIXED_DATA_SIZE = 8;

  @byte() readonly Size = IS_III.FIXED_DATA_SIZE;
  @byte() readonly Type = PacketType.ISP_III;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Connection's unique id (0 = host) */
  @byte() UCID = 0;

  /** Player's unique id (if zero, use UCID) */
  @byte() PLID = 0;

  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;

  /** 4, 8, 12... 64 characters - last byte is zero */
  @string(64) Msg = '';

  unpack(buffer: Buffer): this {
    const data = unpack(`<${getFormat(this, 'Size')}`, buffer);

    if (!data || data.length === 0) {
      throw new InSimError('IS_III - Unpacked no data from buffer');
    }

    const size = data[0] * Packet.SIZE_MULTIPLIER;
    const msgLength = size - IS_III.FIXED_DATA_SIZE;

    super.unpack(buffer, {
      Msg: `${msgLength}s`,
    });

    return this;
  }
}
