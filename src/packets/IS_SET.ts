import { byte, carName, float, unsigned, word } from '../decorators';
import { Packet } from './base';
import type { TyreCompound } from './enums';
import { PacketType } from './enums';
import type { PassengerFlags } from './IS_NPL';
import { CarConfiguration } from './IS_NPL';

/**
 * SETup
 *
 * Set the {@link ISF_SET} flag in the {@link IS_ISI} to receive setups when a guest
 * sends their setup.
 *
 * `Setup` is nearly the same as the body of a `.set` file, minus its 12-byte header. Known
 * differences:
 * - Gear ratio order: in a `.set` file the 7th gear is followed by the final drive ratio
 *   and then the other 6 gears, whereas here all 7 gears are followed by the final drive
 *   ratio ({@link GRatio1}..{@link GRatio7} then {@link GFinalRatio}).
 */
export class IS_SET extends Packet {
  @byte() readonly Size = 136;
  @byte() readonly Type = PacketType.ISP_SET;
  @byte() readonly ReqI = 0;

  @byte() PLID = 0;

  /** Skin prefix */
  @carName() CName = '';

  @unsigned() readonly Spare = 0;

  /** Fuel load at start (%) */
  @byte() FuelLoad = 0;

  @byte() readonly Sp1 = 0;
  @byte() readonly Sp2 = 0;
  @byte() readonly Sp3 = 0;

  /** Setup flags */
  @byte() SetF: SetupFlags | 0 = 0;

  @byte() readonly Sp4 = 0;

  /** Added mass position (%) */
  @byte() H_MBal = 0;

  /** Tyre manufacturer */
  @byte() TyreMfr: TyreManufacturer = 0;

  /** Maximum brake force per wheel (Nm) */
  @float() BrakePerWheel = 0;

  /** Rear wing angle (degrees) */
  @byte() BWingRear = 0;

  /** Front wing angle (degrees) */
  @byte() BWingFront = 0;

  /** 0 to 200 - added mass (kg) */
  @byte() H_Mass = 0;

  /** 0 to 50 - intake restriction (%) */
  @byte() H_TRes = 0;

  /** Maximum steering lock (degrees) */
  @byte() MaxSteer = 0;

  /** Parallel steer (%) */
  @byte() Parallel = 0;

  /** Brake balance (%) */
  @byte() BBal = 0;

  /** Engine brake reduction (%) */
  @byte() AntiEngineBrake = 0;

  /** Centre differential type */
  @byte() CDiffType: CentreDifferential = 0;

  /** Centre differential viscous torque (Nm/rad) */
  @byte() CDiffDDamp = 0;

  @byte() readonly CDiffK2 = 0;

  /** Centre differential torque split */
  @byte() CDiffSplit = 0;

  /** 1st gear ratio, 0 to 65534 = 0.5 to 7.5 */
  @word() GRatio1 = 0;

  /** 2nd gear ratio, 0 to 65534 = 0.5 to 7.5 */
  @word() GRatio2 = 0;

  /** 3rd gear ratio, 0 to 65534 = 0.5 to 7.5 */
  @word() GRatio3 = 0;

  /** 4th gear ratio, 0 to 65534 = 0.5 to 7.5 */
  @word() GRatio4 = 0;

  /** 5th gear ratio, 0 to 65534 = 0.5 to 7.5 */
  @word() GRatio5 = 0;

  /** 6th gear ratio, 0 to 65534 = 0.5 to 7.5 */
  @word() GRatio6 = 0;

  /** 7th gear ratio, 0 to 65534 = 0.5 to 7.5 */
  @word() GRatio7 = 0;

  /** Final drive ratio, 0 to 65534 = 0.5 to 7.5 */
  @word() GFinalRatio = 0;

  /** Passenger flags */
  @byte() Passengers: PassengerFlags | 0 = 0;

  /**
   * Configuration
   *
   * - UF1 / LX4 / LX6: 0 = DEFAULT / 1 = OPEN ROOF
   * - GTR racing cars: 0 = DEFAULT / 1 = ALTERNATE
   */
  @byte() Config: CarConfiguration = CarConfiguration.DEFAULT;

  /** TC slip (%) */
  @byte() TC = 0;

  /** TC minimum speed (m/s) */
  @byte() TCLow = 0;

  /** Rear ride height reduction */
  @float() RRideHeight = 0;

  /** Rear spring stiffness - raw value, N/mm = raw / 1000 */
  @float() RSpring = 0;

  /** Rear bump damping - raw value, Ns/mm = raw / 1000 */
  @float() RBump = 0;

  /** Rear rebound damping - raw value, Ns/mm = raw / 1000 */
  @float() RRebound = 0;

  /** Rear anti-roll bar stiffness - raw value, N/mm = raw / 1000 */
  @float() RARB = 0;

  /** Maximum per-wheel handbrake torque (Nm) */
  @float() HandBrake = 0;

  /** Rear toe in - raw value, degrees = -0.9 + 0.1 * raw */
  @byte() RToe = 0;

  /** Rear caster - raw value, degrees = raw / 10 */
  @byte() RCaster = 0;

  /** Rear tyre compound */
  @byte() RTyreCompound: Exclude<TyreCompound, TyreCompound.NOT_CHANGED> = 0;

  /** Rear tyre warmer temperature (for hotlaps) */
  @byte() RTyreWarmer = 0;

  /** Rear left tyre camber - raw value, degrees = -4.5 + 0.1 * raw */
  @byte() RTyreCamberLeft = 0;

  /** Rear right tyre camber - raw value, degrees = -4.5 + 0.1 * raw */
  @byte() RTyreCamberRight = 0;

  /** Rear tyre width reduction, for GTR class alternate configuration - see {@link IS_NPL.RWAdj} */
  @byte() RTyreWidth = 0;

  /** Rear differential preload (multiply by 10) */
  @byte() RDiffPreload = 0;

  /** Rear differential type */
  @byte() RDiffType: Differential = 0;

  /** Rear differential viscous torque (Nm/rad) */
  @byte() RDiffDDamp = 0;

  /** Rear differential lock (power) */
  @byte() RDiffLockPower = 0;

  /** Rear differential lock (coast) */
  @byte() RDiffLockCoast = 0;

  /** Rear left tyre pressure (kPa) */
  @word() RTyrePressLeft = 0;

  /** Rear right tyre pressure (kPa) */
  @word() RTyrePressRight = 0;

  /** Front ride height reduction */
  @float() FRideHeight = 0;

  /** Front spring stiffness - raw value, N/mm = raw / 1000 */
  @float() FSpring = 0;

  /** Front bump damping - raw value, Ns/mm = raw / 1000 */
  @float() FBump = 0;

  /** Front rebound damping - raw value, Ns/mm = raw / 1000 */
  @float() FRebound = 0;

  /** Front anti-roll bar stiffness - raw value, N/mm = raw / 1000 */
  @float() FARB = 0;

  @unsigned() readonly Sp5 = 0;

  /** Front toe in - raw value, degrees = -0.9 + 0.1 * raw */
  @byte() FToe = 0;

  /** Front caster - raw value, degrees = raw / 10 */
  @byte() FCaster = 0;

  /** Front tyre compound */
  @byte() FTyreCompound: Exclude<TyreCompound, TyreCompound.NOT_CHANGED> = 0;

  /** Front tyre warmer temperature (for hotlaps) */
  @byte() FTyreWarmer = 0;

  /** Front left tyre camber - raw value, degrees = -4.5 + 0.1 * raw */
  @byte() FTyreCamberLeft = 0;

  /** Front right tyre camber - raw value, degrees = -4.5 + 0.1 * raw */
  @byte() FTyreCamberRight = 0;

  /** Front tyre width reduction, for GTR class alternate configuration - see {@link IS_NPL.FWAdj} */
  @byte() FTyreWidth = 0;

  /** Front differential preload (multiply by 10) */
  @byte() FDiffPreload = 0;

  /** Front differential type */
  @byte() FDiffType: Differential = 0;

  /** Front differential viscous torque (Nm/rad) */
  @byte() FDiffDDamp = 0;

  /** Front differential lock (power) */
  @byte() FDiffLockPower = 0;

  /** Front differential lock (coast) */
  @byte() FDiffLockCoast = 0;

  /** Front left tyre pressure (kPa) */
  @word() FTyrePressLeft = 0;

  /** Front right tyre pressure (kPa) */
  @word() FTyrePressRight = 0;
}

export enum SetupFlags {
  /** Symmetrical wheels */
  SETF_SYMM_WHEELS = 1,

  /** Traction control enabled */
  SETF_TC_ENABLE = 2,

  /** Anti-lock brakes enabled */
  SETF_ABS_ENABLE = 4,

  /**
   * If set, the setup has been saved with LFS version X or newer
   * used for pre-load handling
   */
  PATCH_X_SETUP_OR_NEWER = 128,
}

export enum TyreManufacturer {
  CROMO_PLAIN,
  CROMO,
  TORRO,
  MICHELIN,
  EVOSTAR,
  BRIDGESTONE,
  AVON,
}

export enum Differential {
  OPEN_DIFF,
  LOCKED_DIFF,
  VISCOUS_LSD,
  CLUTCH_PACK_LSD,
}

export enum CentreDifferential {
  OPEN_DIFF,
  VISCOUS_LSD,
}
