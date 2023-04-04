import {float} from "../decorators";
import {Struct} from "../packets";

export class OutSimInputs extends Struct {
  @float() Throttle = 0;    // 0 to 1
  @float() Brake = 0;			  // 0 to 1
  @float() InputSteer = 0;	// radians
  @float() Clutch = 0;		  // 0 to 1
  @float() Handbrake = 0;		// 0 to 1
}