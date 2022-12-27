import { byte } from '../utils';
import { AbstractSendableStruct } from './AbstractSendableStruct';

export class CarHCP extends AbstractSendableStruct {
  /** 0 to 200 - added mass (kg) */
  @byte() H_Mass = 0;

  /** 0 to 50 - intake restriction */
  @byte() H_TRes = 0;

  constructor(data?: Partial<CarHCP>) {
    super();
    this.initialize(data);
  }
}
