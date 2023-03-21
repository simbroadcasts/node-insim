import { byte, int, short, word } from '../../utils';
import { Struct } from '../base';
import type { CompCarFlags } from '../enums';
import type { StructData } from '../types';

export class CompCar extends Struct {
  /** Current path node */
  @word() Node = 0;

  /** Current lap */
  @word() Lap = 0;

  /** Player's unique id */
  @byte() PLID = 0;

  /** Current race position: 0 = unknown, 1 = leader, etc... */
  @byte() Position = 0;

  /** Flags and other info */
  @byte() Info: CompCarFlags | 0 = 0;

  @byte() private readonly Sp3 = 0;

  /** X map (65536 = 1 metre) */
  @int() X = 0;

  /** Y map (65536 = 1 metre) */
  @int() Y = 0;

  /** Z alt (65536 = 1 metre) */
  @int() Z = 0;

  /** Speed (32768 = 100 m/s) */
  @word() Speed = 0;

  /** car's motion if Speed > 0: 0 = world y direction, 32768 = 180 deg */
  @word() Direction = 0;

  /** direction of forward axis: 0 = world y direction, 32768 = 180 deg anticlockwise from above */
  @word() Heading = 0;

  /** Signed, rate of change of heading: (8192 = 180 deg/s anticlockwise) */
  @short() AngVel = 0;

  constructor(data?: StructData<CompCar>) {
    super();
    this.initialize(data);
  }
}
