import { byte, short } from '../utils';
import { AbstractSendableStruct } from './base';
import type { ObjectIndex } from './enums';
import type { StructData } from './types';

export class ObjectInfo extends AbstractSendableStruct {
  /** Position (1 metre = 16) */
  @short() X = 0;

  /** Position (1 metre = 16) */
  @short() Y = 0;

  /**
   * Height (1m = 4)
   *
   * About Zbyte, the approximate altitude :
   *
   * LFS does contact checks to place objects accurately on the ground.
   *
   * For output purposes : Zbyte indicates the approximate altitude with a value
   * from 0 to 240 (60 metres).
   *
   * For input purposes : The ground check is performed with a test ray starting
   * from 2 metres above Zbyte. Using a value lower than 240 allows objects to
   * be placed on the road below a bridge, for example. If you are creating
   * objects from scratch and you are not sure of the approximate altitude, you
   * can set Zbyte to its maximum value (240). This will place the object on
   * the first physical surface detected below that point.
   * */
  @byte() Zbyte = 0;

  /** Flags - see NOTE1 at {@link https://www.lfs.net/programmer/lyt} */
  @byte() Flags = 0;

  /**
   * Object index
   *
   * The first valid object index is 4 (AXO_CHALK_LINE).
   * The gaps are to allow for future objects.
   * Valid object indices are all less than 192.
   * */
  @byte() Index: ObjectIndex = 0;

  /**
   * Heading represents 360 degrees in 256 values.
   *
   * Heading = (heading_in_degrees + 180) * 256 / 360
   *
   * - 128 : heading of zero
   * - 192 : heading of 90 degrees
   * - 0   : heading of 180 degrees
   * - 64  : heading of -90 degrees
   */
  @byte() Heading = 0;

  constructor(data?: StructData<ObjectInfo>) {
    super();
    this.initialize(data);
  }
}
