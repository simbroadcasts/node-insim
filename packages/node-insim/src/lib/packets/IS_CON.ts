import { byte, struct, unsigned, word } from '../decorators';
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
  @byte() readonly Size = 44;
  @byte() readonly Type = PacketType.ISP_CON;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** High 4 bits: reserved / low 12 bits: closing speed (10 = 1 m/s) */
  @word() SpClose = 0;

  @word() private readonly SpW = 0;

  /** Time stamp (ms) */
  @unsigned() Time = 0;

  /** Contact object - car A */
  @struct(CarContact) A = new CarContact();

  /** Contact object - car B */
  @struct(CarContact) B = new CarContact();
}
