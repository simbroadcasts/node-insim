import { byte, short, struct, word } from '../decorators';
import { Packet } from './base';
import type { ObjectHitFlags, ObjectIndex } from './enums';
import { PacketType } from './enums';
import { CarContOBJ } from './structs';

/**
 * OBject Hit - car hit an autocross object or an unknown object
 *
 * Set the {@link ISF_OBH} flag in the {@link IS_ISI} to receive object contact reports.
 */
export class IS_OBH extends Packet {
  @byte() readonly Size = 24;
  @byte() readonly Type = PacketType.ISP_OBH;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** High 4 bits: reserved / low 12 bits: closing speed (10 = 1 m/s) */
  @word() SpClose = 0;

  /** Looping time stamp (hundredths - time since reset - like {@link TINY_GTH}) */
  @word() Time = 0;

  /** Contact object */
  @struct(CarContOBJ) C = new CarContOBJ();

  /** Position (1 metre = 16) */
  @short() X = 0;

  /** Position (1 metre = 16) */
  @short() Y = 0;

  /** If {@link OBH_LAYOUT} is set: Zbyte as in {@link ObjectInfo} */
  @byte() Zbyte = 0;

  @byte() private readonly Sp1 = 0;

  /** AXO_x as in {@link ObjectInfo} or zero if it is an unknown object */
  @byte() Index: ObjectIndex = 0;

  @byte() OBHFlags: ObjectHitFlags | 0 = 0;
}
