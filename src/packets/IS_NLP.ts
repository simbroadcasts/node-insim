import { byte, log as baseLog, unpack, word } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import { AbstractStruct } from './AbstractStruct';
import { PacketType } from './enums';

const logError = baseLog.extend('IS_NLP:error');

/**
 * Node and Lap Packet - variable size
 *
 * To receive {@link IS_NLP} packets at a specified interval:
 *
 * - Set the Interval field in the {@link IS_ISI} (InSimInit) packet (10, 20, 30... 8000 ms)
 * - Set {@link ISF_NLP} flag in the {@link IS_ISI} packet
 *
 * If {@link ISF_NLP} flag is set, one {@link IS_NLP} packet is sent...
 */
export class IS_NLP extends AbstractPacket {
  /** 4 + NumP * 6 (PLUS 2 if needed to make it a multiple of 4) */
  @byte() readonly Size = 4;

  @byte() readonly Type = PacketType.ISP_NLP;

  /** 0 unless this is a reply to a {@link TINY_NLP} request */
  @byte() ReqI = 0;

  /** Number of players in race */
  @byte() NumP = 0;

  /** Node and lap of each player, 1 to {@link NLP_MAX_CARS} (NumP) */
  Info: NodeLap[] = [];

  unpack(buffer: Buffer): this {
    super.unpack(buffer);

    const data = unpack(this.getFormat(), buffer);

    if (!data) {
      logError(
        `${
          PacketType[this.Type]
        } - Unpacked no data using ${this.getFormat()} from buffer`,
        buffer.join(),
      );
      return this;
    }

    const nodeLapDataLength = 6;

    for (let i = 0; i < this.NumP; i++) {
      const start = data.length + nodeLapDataLength * i;
      const nodeLapBuffer = buffer.slice(start, start + nodeLapDataLength);
      this.Info.push(new NodeLap().unpack(nodeLapBuffer));
    }

    return this;
  }
}

export class NodeLap extends AbstractStruct {
  /** Current path node */
  @word() Node = 0;

  /** Current lap */
  @word() Lap = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Current race position: 0 = unknown, 1 = leader, etc... */
  @byte() Position = 0;
}

export const NLP_MAX_CARS = 40;
