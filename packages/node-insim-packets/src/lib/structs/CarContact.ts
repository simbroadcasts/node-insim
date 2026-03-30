import { Struct } from '../base/Struct.js';
import { byte, char, short } from '../decorators.js';
import type { StructData } from '../types/StructData.js';

export class CarContact extends Struct {
  @byte() PLID = 0;

  /** Like Info byte in {@link CompCar} (CCI_BLUE / CCI_YELLOW / CCI_LAG) */
  @byte() Info: CarContactFlags | 0 = 0;

  @byte() private readonly Sp2 = 0;

  /** Front wheel steer in degrees (right positive) */
  @char() Steer = 0;

  /** High 4 bits: throttle / low 4 bits: brake (0 to 15) */
  @byte() ThrBrk = 0;

  /** High 4 bits: clutch / low 4 bits: handbrake (0 to 15) */
  @byte() CluHan = 0;

  /** High 4 bits: gear (15=R) / low 4 bits: spare */
  @byte() GearSp = 0;

  /** m/s */
  @byte() Speed = 0;

  /** Car's motion if Speed > 0: 0 = world y direction, 128 = 180 deg */
  @byte() Direction = 0;

  /** Direction of forward axis: 0 = world y direction, 128 = 180 deg */
  @byte() Heading = 0;

  /** m/s^2 longitudinal acceleration (forward positive) */
  @char() AccelF = 0;

  /** m/s^2 lateral acceleration (right positive) */
  @char() AccelR = 0;

  /** Position (1 metre = 16) */
  @short() X = 0;

  /** Position (1 metre = 16) */
  @short() Y = 0;

  constructor(data?: StructData<CarContact>) {
    super();
    this.initialize(data);
  }
}

export enum CarContactFlags {
  /** This car is in the way of a driver who is a lap ahead */
  CCI_BLUE = 1,

  /** This car is slow or stopped and in a dangerous place */
  CCI_YELLOW = 2,

  /** This car is lagging (missing or delayed position packets) */
  CCI_LAG = 32,
}
