import { InSimError } from '../errors';
import { byte, unpack } from '../utils';
import { Packet } from './base';
import { PacketType } from './enums';
import { NodeLap } from './structs';

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
export class IS_NLP extends Packet {
  /** 4 + NumP * 6 (PLUS 2 if needed to make it a multiple of 4) */
  @byte() readonly Size = 4;

  @byte() readonly Type = PacketType.ISP_NLP;

  /** 0 unless this is a reply to a {@link TINY_NLP} request */
  @byte() ReqI = 0;

  /** Number of players in race */
  @byte() NumP = 0;

  /** Node and lap of each player, 1 to {@link NLP_MAX_CARS} (NumP) */
  Info: NodeLap[] = [];

  unpack(buffer: Uint8Array): this {
    super.unpack(buffer);

    const data = unpack(this.getFormat(), buffer.buffer);

    if (!data) {
      throw new InSimError('IS_MSO - Unpacked no data from buffer');
    }

    const nodeLapLength = new NodeLap().getFormatSize();

    for (let i = 0; i < this.NumP; i++) {
      const start = data.length + nodeLapLength * i;
      const nodeLapBuffer = buffer.slice(start, start + nodeLapLength);
      this.Info.push(new NodeLap().unpack(nodeLapBuffer));
    }

    return this;
  }
}

export const NLP_MAX_CARS = 40;
