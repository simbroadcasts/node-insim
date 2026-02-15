import { byte, short } from '../../decorators';
import { Struct } from '../base';
import type { StructData } from '../types';

export class CarContOBJ extends Struct {
  /** Car's motion if Speed > 0: 0 = world y direction, 128 = 180 deg */
  @byte() Direction = 0;

  /** Direction of forward axis: 0 = world y direction, 128 = 180 deg */
  @byte() Heading = 0;

  /** m/s */
  @byte() Speed = 0;

  @byte() Zbyte = 0;

  /** Position (1 metre = 16) */
  @short() X = 0;

  /** Position (1 metre = 16) */
  @short() Y = 0;

  constructor(data?: StructData<CarContOBJ>) {
    super();
    this.initialize(data);
  }
}
