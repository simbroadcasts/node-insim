import { byte, unsigned } from '../decorators';
import { SendablePacket } from './base';
import type { CarFlags } from './enums';
import { PacketType } from './enums';

/**
 * General purpose 8 byte packet
 */
export class IS_SMALL extends SendablePacket {
  /** Stop sending positions */
  public static readonly SSP_STOP_SENDING = 0;

  /** Stop sending gauges */
  public static readonly SSG_STOP_SENDING = 0;

  /** Stop time */
  public static readonly TMS_STOP = 1;

  /** Start time */
  public static readonly TMS_CONTINUE = 0;

  /** Stop sending {@link IS_NLP} or {@link IS_MCI} packets */
  public static readonly NLI_STOP = 0;

  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_SMALL;

  /** 0 unless it is an info request or a reply to an info request */
  @byte() ReqI = 0;

  /** Subtype */
  @byte() SubT: SmallType = SmallType.SMALL_NONE;

  /** Value (e.g. for {@link SMALL_SSP} this would be the OutSim packet rate) */
  @unsigned() UVal = 0;

  constructor(data?: IS_SMALL_Data) {
    super();
    this.initialize(data);
  }
}

export enum SmallType {
  /** Not used */
  SMALL_NONE,

  /** Instruction: start sending positions */
  SMALL_SSP,

  /** Instruction: start sending gauges */
  SMALL_SSG,

  /** Report: vote action */
  SMALL_VTA,

  /** Instruction: time stop */
  SMALL_TMS,

  /** Instruction: time step */
  SMALL_STP,

  /** Info: race time packet (reply to {@link TINY_GTH}) */
  SMALL_RTP,

  /** Instruction: set node lap interval */
  SMALL_NLI,

  /** Both ways: set or get allowed cars ({@link TINY_ALC}) */
  SMALL_ALC,

  /** Instruction: set local car switches (flash, horn, siren) */
  SMALL_LCS,

  /** Instruction: set local car lights */
  SMALL_LCL,

  /** Info: Get local AI info */
  SMALL_AII,
}

export type IS_SMALL_Data =
  | SMALL_SSP_Data
  | SMALL_SSG_Data
  | SMALL_TMS_Data
  | SMALL_STP_Data
  | SMALL_NLI_Data
  | SMALL_ALC_Data
  | SMALL_LCS_Data
  | SMALL_LCL_Data
  | SMALL_AII_Data;

type SMALL_SSP_Data = Data<{
  ReqI?: never;

  /** Instruction: start sending car positions via OutSim */
  SubT: SmallType.SMALL_SSP;

  /** Time between updates in milliseconds - zero means stop sending */
  UVal: number | typeof IS_SMALL.SSP_STOP_SENDING;
}>;

type SMALL_SSG_Data = Data<{
  ReqI?: never;

  /** Instruction: start sending gauges */
  SubT: SmallType.SMALL_SSG;

  /** Time between updates in milliseconds - zero means stop sending */
  UVal: number | typeof IS_SMALL.SSG_STOP_SENDING;
}>;

type SMALL_TMS_Data = Data<{
  ReqI?: never;

  /** Instruction: time stop */
  SubT: SmallType.SMALL_TMS;

  /** 1 - stop / 0 - carry on */
  UVal: typeof IS_SMALL.TMS_STOP | typeof IS_SMALL.TMS_CONTINUE;
}>;

type SMALL_STP_Data = Data<{
  ReqI?: never;

  /** Instruction: time step */
  SubT: SmallType.SMALL_STP;

  /** Number of hundredths of a second to update */
  UVal: number;
}>;

type SMALL_NLI_Data = Data<{
  ReqI?: never;

  /** Instruction: set the rate of {@link IS_NLP} or {@link IS_MCI} after initialization */
  SubT: SmallType.SMALL_NLI;

  /** 0 means stop, otherwise time interval: 40, 50, 60... 8000 ms */
  UVal: number | typeof IS_SMALL.NLI_STOP;
}>;

type SMALL_ALC_Data = Data<{
  ReqI?: never;

  /** Instruction: set allowed cars on the host (like /cars command) */
  SubT: SmallType.SMALL_ALC;

  /** Allowed cars */
  UVal: CarFlags;
}>;

type SMALL_LCS_Data = Data<{
  ReqI?: never;

  /** Instruction: set local car switches (flash, horn, siren) */
  SubT: SmallType.SMALL_LCS;

  /** Switches */
  UVal: LocalCarSwitches;
}>;

type SMALL_LCL_Data = Data<{
  ReqI?: never;

  /** Instruction: set local car lights */
  SubT: SmallType.SMALL_LCL;

  /** Switches */
  UVal: LocalCarLights;
}>;

type SMALL_AII_Data = Data<{
  ReqI: number;

  /** Info: Get local AI info */
  SubT: SmallType.SMALL_AII;

  /** PLID to receive current information about a local car */
  UVal: number;
}>;

type Data<
  TData extends {
    ReqI?: number;
    SubT: SendableSmallType;
    UVal: number;
  },
> = TData;

export const SENDABLE_SMALL_TYPES = [
  SmallType.SMALL_SSP,
  SmallType.SMALL_SSG,
  SmallType.SMALL_TMS,
  SmallType.SMALL_STP,
  SmallType.SMALL_NLI,
  SmallType.SMALL_ALC,
  SmallType.SMALL_LCS,
  SmallType.SMALL_LCL,
  SmallType.SMALL_AII,
] as const;

export type SendableSmallType = (typeof SENDABLE_SMALL_TYPES)[number];

const LCL_SET_SIGNALS = 1;
const LCL_SET_LIGHTS = 4;
const LCL_SET_FOG_REAR = 16;
const LCL_SET_FOG_FRONT = 32;
const LCL_SET_EXTRA = 64;

export enum LocalCarLights {
  /** Turn all signals off */
  SIGNALS_OFF = LCL_SET_SIGNALS,

  /** Turn left signals on */
  SIGNALS_LEFT = LCL_SET_SIGNALS + (1 << 16),

  /** Turn right signals on */
  SIGNALS_RIGHT = LCL_SET_SIGNALS + (2 << 16),

  /** Turn hazards on */
  SIGNALS_HAZARD = LCL_SET_SIGNALS + (3 << 16),

  /** Turn lights off */
  LIGHTS_OFF = LCL_SET_LIGHTS,

  /** Turn side lights on */
  LIGHTS_SIDE = LCL_SET_LIGHTS + (1 << 18),

  /** Turn low beam on */
  LIGHTS_LOW = LCL_SET_LIGHTS + (2 << 18),

  /** Turn high beam on */
  LIGHTS_HIGH = LCL_SET_LIGHTS + (3 << 18),

  /** Turn rear fog light off */
  FOG_REAR_OFF = LCL_SET_FOG_REAR,

  /** Turn rear fog light on */
  FOG_REAR = LCL_SET_FOG_REAR + (1 << 20),

  /** Turn front fog light off */
  FOG_FRONT_OFF = LCL_SET_FOG_FRONT,

  /** Turn front fog light on */
  FOG_FRONT = LCL_SET_FOG_FRONT + (1 << 21),

  /** Turn extra light off */
  EXTRA_OFF = LCL_SET_EXTRA,

  /** Turn extra light on */
  EXTRA = LCL_SET_EXTRA + (1 << 22),
}

const LCS_SET_SIGNALS = 1;
const LCS_SET_FLASH = 2;
const LCS_SET_HEADLIGHTS = 4;
const LCS_SET_HORN = 8;
const LCS_SET_SIREN = 16;

export enum LocalCarSwitches {
  /**
   * Turn all signals off
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.SIGNALS_OFF}
   */
  SIGNALS_OFF = LCS_SET_SIGNALS,

  /**
   * Turn left signals on
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.SIGNALS_LEFT}
   */
  SIGNALS_LEFT = LCS_SET_SIGNALS + (1 << 8),

  /**
   * Turn right signals on
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.SIGNALS_RIGHT}
   */
  SIGNALS_RIGHT = LCS_SET_SIGNALS + (2 << 8),

  /**
   * Turn hazards on
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.SIGNALS_HAZARD}
   */
  SIGNALS_HAZARD = LCS_SET_SIGNALS + (3 << 8),

  /** Stop flashing lights */
  FLASH_OFF = LCS_SET_FLASH,

  /** Start flashing lights */
  FLASH_ON = LCS_SET_FLASH + (1 << 10),

  /**
   * Turn headlights off
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.LIGHTS_OFF}
   */
  HEADLIGHTS_OFF = LCS_SET_HEADLIGHTS,

  /**
   * Turn headlights on
   *
   * @deprecated Use {@link SMALL_LCL} with {@link LocalCarLights.LIGHTS_SIDE}, {@link LocalCarLights.LIGHTS_LOW} or
   *   {@link LocalCarLights.LIGHTS_HIGH}
   */
  HEADLIGHTS_ON = LCS_SET_HEADLIGHTS + (1 << 11),

  /** Turn horn off */
  HORN_OFF = LCS_SET_HORN,

  /** Turn on horn sound 1 */
  HORN_1 = LCS_SET_HORN + (1 << 16),

  /** Turn on horn sound 2 */
  HORN_2 = LCS_SET_HORN + (2 << 16),

  /** Turn on horn sound 3 */
  HORN_3 = LCS_SET_HORN + (3 << 16),

  /** Turn on horn sound 4 */
  HORN_4 = LCS_SET_HORN + (4 << 16),

  /** Turn on horn sound 5 */
  HORN_5 = LCS_SET_HORN + (5 << 16),

  /** Turn siren off */
  SIREN_OFF = LCS_SET_SIREN,

  /** Turn fast siren on */
  SIREN_FAST = LCS_SET_SIREN + (1 << 20),

  /** Turn slow siren on */
  SIREN_SLOW = LCS_SET_SIREN + (2 << 20),
}
