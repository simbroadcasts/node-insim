import { byte, int, log as baseLog, short, unpack, word } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import { AbstractStruct } from './AbstractStruct';
import type { CompCarFlags } from './enums';
import { PacketType } from './enums';

const logError = baseLog.extend('IS_MCI:error');

/**
 * Multi Car Info - if more than {@link MCI_MAX_CARS} in race then more than one is sent
 */
export class IS_MCI extends AbstractPacket {
  /** 4 + NumC * 28 */
  @byte() readonly Size = 4;

  @byte() readonly Type = PacketType.ISP_MCI;

  /** 0 unless this is a reply to an {@link TINY_MCI} request */
  @byte() ReqI = 0;

  /** Number of valid CompCar structs in this packet */
  @byte() NumC = 0;

  /** Car info for each player, 1 to {@link MCI_MAX_CARS} (NumC) */
  Info: CompCar[] = [];

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

    const nodeLapDataLength = 28;

    for (let i = 0; i < this.NumC; i++) {
      const start = data.length + nodeLapDataLength * i;
      const nodeLapBuffer = buffer.slice(start, start + nodeLapDataLength);
      this.Info.push(new CompCar().unpack(nodeLapBuffer));
    }

    return this;
  }
}

export class CompCar extends AbstractStruct {
  /** Current path node */
  @word() Node = 0;

  /** Current lap */
  @word() Lap = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Current race position: 0 = unknown, 1 = leader, etc... */
  @byte() Position = 0;

  /** Flags and other info */
  @byte() Info: CompCarFlags = 0;

  @byte() Sp3: 0 = 0;

  /** X map (65536 = 1 metre) */
  @int() X = 0;

  /** Y map (65536 = 1 metre) */
  @int() Y = 0;

  /** Z alt (65536 = 1 metre) */
  @int() Z = 0;

  /** Speed (32768 = 100 m/s) */
  @word() Speed = 0;

  /** car's motion if Speed > 0: 0 = world y direction, 32768 = 180 deg */
  @word() Direction = 0;

  /** direction of forward axis: 0 = world y direction, 32768 = 180 deg anticlockwise from above */
  @word() Heading = 0;

  /** Signed, rate of change of heading: (8192 = 180 deg/s anticlockwise) */
  @short() AngVel = 0;
}

export const MCI_MAX_CARS = 16;
