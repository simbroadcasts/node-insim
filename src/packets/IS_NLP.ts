import { byte, unpack } from '../utils';
import { BasePacket } from './BasePacket';
import { PacketType } from './enums';

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
export class IS_NLP extends BasePacket {
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
      return this;
    }

    const nodeLapDataOffset = data.length;
    const nodeLapDataFormat = 'HHBB';
    const nodeLapDataBlockLength = 4; // after unpacking

    const nodeLapData = unpack(
      `${`<${nodeLapDataFormat}`.repeat(this.NumP)}`,
      buffer.slice(nodeLapDataOffset),
    );

    if (
      !nodeLapData ||
      nodeLapData.length !== this.NumP * nodeLapDataBlockLength
    ) {
      return this;
    }

    for (let i = 0; i < this.NumP; i++) {
      const start = nodeLapDataOffset * i;
      const [Node, Lap, PLID, Position] = nodeLapData.slice(
        start,
        start + nodeLapDataBlockLength,
      );
      this.Info.push({
        Node,
        Lap,
        PLID,
        Position,
      });
    }

    return this;
  }
}

export type NodeLap = {
  /** Current path node */
  Node: number;

  /** Current lap */
  Lap: number;

  /** Player's unique id */
  PLID: number;

  /** Current race position: 0 = unknown, 1 = leader, etc... */
  Position: number;
};

export const NLP_MAX_CARS = 40;
