import { float, Vec, Vector } from '../decorators';
import { Struct } from '../packets/base/Struct';

export class OutSimMain extends Struct {
  /** 3 floats, angular velocity vector */
  @Vector() AngVel = [0, 0, 0];
  /** anticlockwise from above (Z) */
  @float() Heading = 0;
  /** anticlockwise from right (X) */
  @float() Pitch = 0;
  /** anticlockwise from front (Y) */
  @float() Roll = 0;
  /** 3 floats X, Y, Z */
  @Vector() Accel = [0, 0, 0];
  /** 3 floats X, Y, Z */
  @Vector() Vel = [0, 0, 0];
  /** 3 ints   X, Y, Z (1m = 65536) */
  @Vec() Pos = [0, 0, 0];
}
