import { byte, char, determineLength, short, word } from '../utils';
import { AbstractPacket } from './AbstractPacket';
import { AbstractStruct } from './AbstractStruct';
import type { CarContactFlags } from './enums';
import { PacketType } from './enums';

/**
 * CONtact - between two cars (A and B are sorted by PLID)
 *
 * This packet reports contacts between two cars if the closing speed is above 0.25 m/s.
 *
 * Set the {@link ISF_CON} flag in the {@link IS_ISI} to receive car contact reports.
 */
export class IS_CON extends AbstractPacket {
  @byte() readonly Size = 40;
  @byte() readonly Type = PacketType.ISP_CON;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** High 4 bits: reserved / low 12 bits: closing speed (10 = 1 m/s) */
  @word() SpClose = 0;

  /** Looping time stamp (hundredths - time since reset - like {@link TINY_GTH}) */
  @word() Time = 0;

  A: CarContact = new CarContact();
  B: CarContact = new CarContact();

  unpack(buffer: Buffer): this {
    super.unpack(buffer);

    const carContactDataOffset = determineLength(this.getFormat());
    const carContactDataLength = determineLength(new CarContact().getFormat());

    const carContactBufferA = buffer.slice(
      carContactDataOffset,
      carContactDataOffset + carContactDataLength,
    );
    this.A = new CarContact().unpack(carContactBufferA);

    const carContactBufferB = buffer.slice(
      carContactDataOffset + carContactDataLength,
      carContactDataOffset + carContactDataLength * 2,
    );
    this.B = new CarContact().unpack(carContactBufferB);

    return this;
  }
}

class CarContact extends AbstractStruct {
  @byte() PLID = 0;

  /** Like Info byte in {@link CompCar} (CCI_BLUE / CCI_YELLOW / CCI_LAG) */
  @byte() Info: CarContactFlags = 0;

  @byte() readonly Sp2 = 0;

  /** Front wheel steer in degrees (right positive) */
  @char() Steer = 0;

  /** High 4 bits: throttle / low 4 bits: brake (0 to 15) */
  @byte() ThrBrk = 0;

  /** High 4 bits: clutch / low 4 bits: handbrake (0 to 15) */
  @byte() CluHan = 0;

  /** High 4 bits: gear (15=R) / low 4 bits: spare */
  @byte() GearSp = 0;

  /** m/s */
  @byte() Speed = 0;

  /** Car's motion if Speed > 0: 0 = world y direction, 128 = 180 deg */
  @byte() Direction = 0;

  /** Direction of forward axis: 0 = world y direction, 128 = 180 deg */
  @byte() Heading = 0;

  /** m/s^2 longitudinal acceleration (forward positive) */
  @char() AccelF = 0;

  /** m/s^2 lateral acceleration (right positive) */
  @char() AccelR = 0;

  /** Position (1 metre = 16) */
  @short() X = 0;

  /** Position (1 metre = 16) */
  @short() Y = 0;
}
