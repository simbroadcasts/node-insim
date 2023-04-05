import { byte, float } from '../decorators';
import { Struct } from '../packets';

export class OutSimWheel extends Struct {
  /** compression from unloaded */
  @float() SuspDeflect = 0;
  /** including Ackermann and toe */
  @float() Steer = 0;
  /** force right */
  @float() XForce = 0;
  /** force forward */
  @float() YForce = 0;
  /** perpendicular to surface */
  @float() VerticalLoad = 0;
  /** radians/s */
  @float() AngVel = 0;
  /** radians a-c viewed from rear */
  @float() LeanRelToRoad = 0;

  /** degrees C */
  @byte() AirTemp = 0;
  /** (0 to 255 - see below) */
  @byte() SlipFraction = 0;
  /** touching ground */
  @byte() Touching = 0;
  @byte() Sp3 = 0;

  /** slip ratio */
  @float() SlipRatio = 0;
  /** tangent of slip angle */
  @float() TanSlipAngle = 0;
}
