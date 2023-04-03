import { float, int, unsigned } from '../decorators';
import { Struct } from '../packets';

/**
 * OutSim - MOTION SIMULATOR SUPPORT AND TELEMETRY OUTPUT
 *
 * The user's car in multiplayer or the viewed car in single player or single player
 * replay can output data to an external program while in VIEW_DRIVER or VIEW_CUSTOM.
 *
 * This can be controlled by 6 lines in the cfg.txt file:
 *
 * OutSim Mode 0      : 0 = off / 1 = driving / 2 = driving + replay
 * OutSim Delay 1     : minimum delay between packets (100ths of a sec)
 * OutSim IP 0.0.0.0  : IP address to send the UDP packet
 * OutSim Port 0      : IP port
 * OutSim ID 0        : if not zero, adds an identifier to the packet
 * OutSim Opts 0      : see docs\OutSimPack.txt for the available options
 *
 * If OutSim Opts is zero, each update sends the following UDP packet.
 *
 * NOTE 1) X and Y axes are on the ground, Z is up.
 *
 * NOTE 2) Motion simulators can be dangerous.  The Live for Speed developers do
 * not support any motion systems in particular and cannot accept responsibility
 * for injuries or deaths connected with the use of such machinery.
 */
export class OutSimPack extends Struct {
  static readonly MIN_SIZE = 64;
  static readonly MAX_SIZE = 68;

  /** Time in milliseconds (to check order) */
  @unsigned() Time = 0;

  /** Angular velocity vector - X axis */
  @float() AngVelX = 0;

  /** Angular velocity vector - Y axis */
  @float() AngVelY = 0;

  /** Angular velocity vector - Z axis */
  @float() AngVelZ = 0;

  /** Anticlockwise from above (Z) */
  @float() Heading = 0;

  /** Anticlockwise from above (Z) */
  @float() Pitch = 0;

  /** Anticlockwise from above (Z) */
  @float() Roll = 0;

  /** Acceleration - X axis */
  @float() AccelX = 0;

  /** Acceleration - Y axis */
  @float() AccelY = 0;

  /** Acceleration - Z axis */
  @float() AccelZ = 0;

  /** Velocity - X axis */
  @float() VelX = 0;

  /** Velocity - Y axis */
  @float() VelY = 0;

  /** Velocity - Z axis */
  @float() VelZ = 0;

  /** Position - X axis (1 m = 65536) */
  @int() PosX = 0;

  /** Position - Y axis (1 m = 65536) */
  @int() PosY = 0;

  /** Position - Z axis (1 m = 65536) */
  @int() PosZ = 0;

  /** Optional - only if OutGauge ID is specified */
  @int() ID = 0;

  unpack(buffer: Uint8Array): this {
    let outSimData = buffer;

    if (buffer.length === OutSimPack.MIN_SIZE) {
      outSimData = new Uint8Array(OutSimPack.MAX_SIZE);
      outSimData.set(buffer);
      outSimData.set([0], OutSimPack.MIN_SIZE);
    }

    return super.unpack(outSimData);
  }
}
