import {Struct} from "../packets";
import {float, Vec, Vector} from "../decorators";

export class OutSimMain extends Struct {
  @Vector() AngVel = [0, 0, 0]; // 3 floats, angular velocity vector
  @float() Heading = 0;	        // anticlockwise from above (Z)
  @float() Pitch = 0;		        // anticlockwise from right (X)
  @float() Roll = 0;		        // anticlockwise from front (Y)
  @Vector() Accel = [0, 0, 0];	// 3 floats X, Y, Z
  @Vector() Vel = [0, 0, 0];		// 3 floats X, Y, Z
  @Vec() Pos = [0, 0, 0];		    // 3 ints   X, Y, Z (1m = 65536)
}