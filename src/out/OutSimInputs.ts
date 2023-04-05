import { float } from '../decorators';
import { Struct } from '../packets';

export class OutSimInputs extends Struct {
  /** 0 to 1 */
  @float() Throttle = 0;
  /** 0 to 1 */
  @float() Brake = 0;
  /** radians */
  @float() InputSteer = 0;
  /** 0 to 1 */
  @float() Clutch = 0;
  /** 0 to 1 */
  @float() Handbrake = 0;
}
