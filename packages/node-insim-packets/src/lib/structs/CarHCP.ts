import { SendableStruct } from '../base/SendableStruct.js';
import { byte } from '../decorators.js';
import type { StructData } from '../types/StructData.js';

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
