import { byte, determineLength } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import { CompCar } from './CompCar';
import { PacketType } from './enums';

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

    const compCarDataLength = determineLength(new CompCar().getFormat());

    for (let i = 0; i < this.NumC; i++) {
      const start = determineLength(this.getFormat()) + compCarDataLength * i;
      const compCarBuffer = buffer.slice(start, start + compCarDataLength);
      this.Info.push(new CompCar().unpack(compCarBuffer));
    }

    return this;
  }
}

export const MCI_MAX_CARS = 16;
