import { byte, struct, unsigned } from '../decorators';
import { Packet } from './base';
import type { CSCAction } from './enums';
import { PacketType } from './enums';
import { CarContOBJ } from './structs';

/**
 * Car State Changed - reports a change in a car's state (currently start or stop)
 */
export class IS_CSC extends Packet {
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
  @struct(CarContOBJ) C = new CarContOBJ();
}
