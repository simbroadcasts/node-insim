import { byte } from '../../decorators';
import { SendableStruct } from '../base';
import type { StructData } from '../types';

export class CarHCP extends SendableStruct {
  /** 0 to 200 - added mass (kg) */
  @byte() H_Mass = 0;

  /** 0 to 50 - intake restriction */
  @byte() H_TRes = 0;

  constructor(data?: StructData<CarHCP>) {
    super();
    this.initialize(data);
  }
}
