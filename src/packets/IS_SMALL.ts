import { byte, unsigned } from '../decorators';
import { SendablePacket } from './base';
import type { CarFlags, LocalCarLights, LocalCarSwitches } from './enums';
import { PacketType, SmallType } from './enums';

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

  /** Switches */
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
