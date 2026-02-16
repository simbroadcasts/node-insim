import { Packet } from '../base/index.js';
import { byte } from '../decorators.js';
import { PacketType } from '../enums/index.js';
import { copyBuffer } from '../lfspack.js';
import { CompCar } from '../structs/index.js';

/**
 * Multi Car Info - if more than {@link MCI_MAX_CARS} in race then more than one is sent
 */
export class IS_MCI extends Packet {
  /** 4 + NumC * 28 */
  @byte() readonly Size = 4;

  @byte() readonly Type = PacketType.ISP_MCI;

  /** 0 unless this is a reply to an {@link TINY_MCI} request */
  @byte() ReqI = 0;

  /** Number of valid CompCar structs in this packet */
  @byte() NumC = 0;

  /** Car info for each player, 1 to {@link MCI_MAX_CARS} (NumC) */
  Info: CompCar[] = [];

  override unpack(buffer: Uint8Array<ArrayBuffer>): this {
    super.unpack(buffer);

    const compCarSize = new CompCar().getFormatSize();

    for (let i = 0; i < this.NumC; i++) {
      const start = 4 + compCarSize * i;
      const compCarBuffer = copyBuffer(
        buffer.slice(start, start + compCarSize),
      );
      this.Info.push(new CompCar().unpack(compCarBuffer));
    }

    return this;
  }
}

export const MCI_MAX_CARS = 16;
