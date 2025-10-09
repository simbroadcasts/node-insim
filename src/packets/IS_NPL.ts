import { byte, carName, string, stringNull, word } from '../decorators';
import { isFlagOn } from '../utils/bitwiseFlags';
import { Packet } from './base';
import type { TyreCompound } from './enums';
import { PacketType, PlayerFlags } from './enums';

/**
 * New PLayer joining race (if PLID already exists, then leaving pits)
 */
export class IS_NPL extends Packet {
  @byte() readonly Size = 76;
  @byte() readonly Type = PacketType.ISP_NPL;

  /** 0 unless this is a reply to a {@link TINY_NPL} */
  @byte() ReqI = 0;

  /** Player's newly assigned unique id */
  @byte() PLID = 0;

  /** Connection's unique id */
  @byte() UCID = 0;

  /** Bit 0: female / bit 1: AI / bit 2: remote */
  @byte() PType: PlayerType | 0 = 0;

  /** Player flags */
  @word() Flags: PlayerFlags | 0 = 0;

  /** Nickname */
  @stringNull(24) PName = '';

  /** Number plate - NO ZERO AT END! */
  @string(8) Plate = '';

  /**
   * Car name
   *
   * The value can be one of these:
   * - a 3-character abbreviation of an official LFS car (e.g. XRT)
   * - a hexadecimal string representation of a car mod's SkinID (e.g. 5882E6)
   */
  @carName() CName = '';

  /** Skin name - MAX_CAR_TEX_NAME */
  @stringNull(16) SName = '';

  /** Rear left tyre compound */
  @byte() TyreRL: TyreCompound = 0;

  /** Rear right tyre compound */
  @byte() TyreRR: TyreCompound = 0;

  /** Front left tyre compound */
  @byte() TyreFL: TyreCompound = 0;

  /** Front right tyre compound */
  @byte() TyreFR: TyreCompound = 0;

  /** Added mass (kg) */
  @byte() H_Mass = 0;

  /** Intake restriction */
  @byte() H_TRes = 0;

  /** Driver model */
  @byte() Model = 0;

  /** Passengers byte */
  @byte() Pass: PassengerFlags | 0 = 0;

  /** Low 4 bits: tyre width reduction (rear) */
  @byte() RWAdj = 0;

  /** Low 4 bits: tyre width reduction (front) */
  @byte() FWAdj = 0;

  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;

  /** Setup flags */
  @byte() SetF: SetupFlags | 0 = 0;

  /** Number in race - ZERO if this is a join request */
  @byte() NumP = 0;

  /**
   * Configuration
   *
   * - UF1 / LX4 / LX6: 0 = DEFAULT / 1 = OPEN ROOF
   * - GTR racing cars: 0 = DEFAULT / 1 = ALTERNATE
   */
  @byte() Config: CarConfiguration = CarConfiguration.DEFAULT;

  /** /showfuel yes: fuel percent / no: 255 */
  @byte() Fuel = 0;

  public get isFemale() {
    return (this.PType & PlayerType.FEMALE) !== 0;
  }

  public get isMale() {
    return !this.isFemale;
  }

  public get isAI() {
    return isFlagOn(this.PType, PlayerType.AI);
  }

  public get isRemote() {
    return isFlagOn(this.PType, PlayerType.REMOTE);
  }

  public get isDriverOnLeftSide() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_LEFTSIDE);
  }

  public get hasAutoGearShift() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_AUTOGEARS);
  }

  public get hasShifter() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_SHIFTER);
  }

  public get hasBrakeHelp() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_HELP_B);
  }

  public get hasAxisClutch() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_AXIS_CLUTCH);
  }

  public get isInPits() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_INPITS);
  }

  public get hasAutoClutch() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_AUTOCLUTCH);
  }

  public get hasMouseSteering() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_MOUSE);
  }

  public get hasKeyboardSteeringNoHelp() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_KB_NO_HELP);
  }

  public get hasKeyboardSteeringStabilised() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_KB_STABILISED);
  }

  public get hasCustomView() {
    return isFlagOn(this.Flags, PlayerFlags.PIF_CUSTOM_VIEW);
  }

  public get passengerCount() {
    return Object.keys(PassengerFlags).filter((key) =>
      isFlagOn(this.Pass, PassengerFlags[key as keyof typeof PassengerFlags]),
    ).length;
  }
}

export enum CarConfiguration {
  /** Default */
  DEFAULT,

  /**
   * UF1 / LX4 / LX6 = open roof
   * GTR racing cars = alternate
   */
  OPEN_ROOF_OR_ALTERNATE,
}

export enum PassengerFlags {
  /** Front passenger is male */
  FRONT_MALE = 1,

  /** Front passenger is female */
  FRONT_FEMALE = 2,

  /** Rear-left passenger is male */
  REAR_LEFT_MALE = 4,

  /** Rear-left passenger is female */
  REAR_LEFT_FEMALE = 8,

  /** Rear-middle passenger is male */
  REAR_MIDDLE_MALE = 16,

  /** Rear-middle passenger is female */
  REAR_MIDDLE_FEMALE = 32,

  /** Rear-right passenger is male */
  REAR_RIGHT_MALE = 64,

  /** Rear-right passenger is female */
  REAR_RIGHT_FEMALE = 128,
}

export enum PlayerType {
  /** Female */
  FEMALE = 1,

  /** AI */
  AI = 2,

  /** Remote */
  REMOTE = 4,
}

export enum SetupFlags {
  /** Symmetrical wheels */
  SETF_SYMM_WHEELS = 1,

  /** Traction control enabled */
  SETF_TC_ENABLE = 2,

  /** Anti-lock brakes enabled */
  SETF_ABS_ENABLE = 4,
}
