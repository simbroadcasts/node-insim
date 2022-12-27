import { byte, determineLength, struct, unsigned } from '../utils';
import { AbstractPacket } from './base';
import { CarContOBJ } from './CarContOBJ';
import type { UCOAction } from './enums';
import { PacketType } from './enums';
import { ObjectInfo } from './ObjectInfo';

/**
 * User Control Object
 *
 * Reports crossing an InSim checkpoint / entering an InSim circle (from layout).
 */
export class IS_UCO extends AbstractPacket {
  @byte() readonly Size = 28;
  @byte() readonly Type = PacketType.ISP_UCO;
  @byte() readonly ReqI = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  @byte() private Sp0 = 0;

  /** Entering/leaving a circle or crossing a checkpoint */
  @byte() UCOAction: UCOAction = 0;

  @byte() private Sp2 = 0;
  @byte() private Sp3 = 0;

  /** Hundredths of a second since start (as in {@link SMALL_RTP}) */
  @unsigned() Time = 0;

  /** Car contact object */
  @struct(CarContOBJ) C: CarContOBJ = new CarContOBJ();

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
   **/
  @struct(ObjectInfo) Info: ObjectInfo = new ObjectInfo();

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

    const objectInfoOffset = carContactOffset + carContactLength;
    const objectInfoLength = determineLength(
      `<${new ObjectInfo().getFormat()}`,
    );

    const infoBuffer = buffer.slice(
      objectInfoOffset,
      objectInfoOffset + objectInfoLength,
    );

    this.Info = new ObjectInfo().unpack(infoBuffer);

    return this;
  }
}
