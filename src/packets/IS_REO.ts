import { byte, byteArray } from '../utils';
import { AbstractSendablePacket } from './AbstractSendablePacket';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * REOrder (when race restarts after qualifying)
 *
 * This packet can be sent in either direction
 *
 * LFS sends one at the start of every race or qualifying session, listing the start order
 *
 * You can send one to LFS in two different ways, to specify the starting order:
 * - In the race setup screen, to immediately rearrange the grid when the packet arrives
 * - In game, just before a restart or exit, to specify the order on the restart or exit
 *
 * If you are sending an {@link IS_REO} in game, you should send it when you receive the {@link SMALL_VTA}
 * informing you that the Vote Action ({@link VOTE_END} / {@link VOTE_RESTART} / {@link VOTE_QUALIFY}) is about
 * to take place. Any {@link IS_REO} received before the {@link SMALL_VTA} is sent will be ignored.
 *
 * To request an {@link IS_REO} packet at any time, send this {@link IS_TINY}:
 *
 * - ReqI: non-zero            (returned in the reply)
 * - SubT: {@link TINY_REO}    (request an IS_REO)
 */
export class IS_REO extends AbstractSendablePacket {
  private MAX_DRIVERS = 40;

  @byte() readonly Size = 44;
  @byte() readonly Type = PacketType.ISP_REO;

  /** 0 unless this is a reply to an {@link TINY_REO} request */
  @byte() readonly ReqI = 0;

  /** Number of players in race */
  @byte() NumP = 0;

  /** All PLIDs in new order */
  @byteArray(40) PLID = Array<number>(40).fill(0);

  constructor(data?: IS_REO_Data) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    if (this.PLID.length > this.MAX_DRIVERS) {
      throw new RangeError(
        `IS_REO - Too many players (max is ${this.MAX_DRIVERS}`,
      );
    }

    return super.pack();
  }
}

export type IS_REO_Data = PacketData<IS_REO>;
