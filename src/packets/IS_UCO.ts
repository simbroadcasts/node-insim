import { byte, struct, unsigned } from '../decorators';
import { Packet } from './base';
import { PacketType } from './enums';
import { CarContOBJ, ObjectInfo } from './structs';

/**
 * User Control Object
 *
 * Reports crossing an InSim checkpoint / entering an InSim circle (from layout).
 */
export class IS_UCO extends Packet {
  @byte() readonly Size = 28;
  @byte() readonly Type = PacketType.ISP_UCO;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  @byte() private readonly Sp0 = 0;

  /** Entering/leaving a circle or crossing a checkpoint */
  @byte() UCOAction: UCOAction = 0;

  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;

  /** Milliseconds since start (as in {@link SMALL_RTP}) */
  @unsigned() Time = 0;

  /** Car contact object */
  @struct(CarContOBJ) C = new CarContOBJ();

  /**
   * Info about the checkpoint or circle
   *
   * Identifying an InSim checkpoint:
   *
   * Index is 252. Checkpoint index (seen in the layout editor) is stored in Flags
   * bits 0 and 1.
   *
   * - 00 = finish line
   * - 01 = 1st checkpoint
   * - 10 = 2nd checkpoint
   * - 11 = 3rd checkpoint
   *
   * Note that the checkpoint index has no meaning in LFS and is provided only for your convenience.
   * If you use many InSim checkpoints you may need to identify them with the X and Y values.
   *
   * Identifying an InSim circle:
   *
   * Index is 253. The circle index (seen in the layout editor) is stored in the Heading byte.
   */
  @struct(ObjectInfo) Info = new ObjectInfo();
}

export enum UCOAction {
  /** Etered a circle */
  UCO_CIRCLE_ENTER,

  /** Left a circle */
  UCO_CIRCLE_LEAVE,

  /** Crossed a checkpoint in forward direction */
  UCO_CP_FWD,

  /** Crossed a checkpoint in reverse direction */
  UCO_CP_REV,
}
