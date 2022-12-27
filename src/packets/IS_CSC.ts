import { byte, determineLength, struct, unsigned } from '../utils';
import { AbstractPacket } from './base';
import { CarContOBJ } from './CarContOBJ';
import type { CSCAction } from './enums';
import { PacketType } from './enums';

/**
 * Car State Changed - reports a change in a car's state (currently start or stop)
 */
export class IS_CSC extends AbstractPacket {
  @byte() readonly Size = 20;
  @byte() readonly Type = PacketType.ISP_CSC;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  @byte() private readonly Sp0 = 0;

  @byte() CSCAction: CSCAction = 0;

  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;

  /** Hundredths of a second since start (as in {@link SMALL_RTP}) */
  @unsigned() Time = 0;

  /** Car contact object */
  @struct(CarContOBJ) C: CarContOBJ = new CarContOBJ();

  unpack(buffer: Buffer): this {
    super.unpack(buffer);

    const carContactOffset = 12;
    const carContactLength = determineLength(
      `<${new CarContOBJ().getFormat()}`,
    );

    const carContactBuffer = buffer.slice(
      carContactOffset,
      carContactOffset + carContactLength,
    );

    this.C = new CarContOBJ().unpack(carContactBuffer);

    return this;
  }
}
