import { byte, float } from '../decorators';
import { Struct } from '../packets';

export class OutSimWheel extends Struct {
  // 10 ints
  @float() SuspDeflect = 0; // compression from unloaded
  @float() Steer = 0; // including Ackermann and toe
  @float() XForce = 0; // force right
  @float() YForce = 0; // force forward
  @float() VerticalLoad = 0; // perpendicular to surface
  @float() AngVel = 0; // radians/s
  @float() LeanRelToRoad = 0; // radians a-c viewed from rear

  @byte() AirTemp = 0; // degrees C
  @byte() SlipFraction = 0; // (0 to 255 - see below)
  @byte() Touching = 0; // touching ground
  @byte() Sp3 = 0;

  @float() SlipRatio = 0; // slip ratio
  @float() TanSlipAngle = 0; // tangent of slip angle
}
