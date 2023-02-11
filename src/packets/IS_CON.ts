import { byte, word } from '../utils';
import { Packet } from './base';
import { PacketType } from './enums';
import { CarContact } from './structs';

/**
 * CONtact - between two cars (A and B are sorted by PLID)
 *
 * This packet reports contacts between two cars if the closing speed is above 0.25 m/s.
 *
 * Set the {@link ISF_CON} flag in the {@link IS_ISI} to receive car contact reports.
 */
export class IS_CON extends Packet {
  @byte() readonly Size = 40;
  @byte() readonly Type = PacketType.ISP_CON;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** High 4 bits: reserved / low 12 bits: closing speed (10 = 1 m/s) */
  @word() SpClose = 0;

  /** Looping time stamp (hundredths - time since reset - like {@link TINY_GTH}) */
  @word() Time = 0;

  /** Contact object - car A */
  A: CarContact = new CarContact();

  /** Contact object - car B */
  B: CarContact = new CarContact();

  unpack(buffer: Buffer): this {
    super.unpack(buffer);

    const carContactOffset = this.getFormatSize();
    const carContactLength = new CarContact().getFormatSize();

    const carContactBufferA = buffer.slice(
      carContactOffset,
      carContactOffset + carContactLength,
    );
    const carContactBufferB = buffer.slice(
      carContactOffset + carContactLength,
      carContactOffset + carContactLength * 2,
    );

    this.A = new CarContact().unpack(carContactBufferA);
    this.B = new CarContact().unpack(carContactBufferB);

    return this;
  }
}
