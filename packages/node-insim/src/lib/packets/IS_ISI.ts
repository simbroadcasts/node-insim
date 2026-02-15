import { byte, string, stringNull, word } from '../decorators';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import type { PacketDataWithOptionalReqI } from './types';

/**
 * InSim Init - packet to initialise the InSim system
 */
export class IS_ISI extends SendablePacket {
  @byte() readonly Size = 44;
  @byte() readonly Type = PacketType.ISP_ISI;

  /** If non-zero LFS will send an {@link IS_VER} packet */
  @byte() ReqI = 0;

  @byte() readonly Zero = 0;

  /** Port for UDP replies from LFS (0 to 65535) */
  @word() UDPPort = 0;

  /** Bit flags for options */
  @word() Flags: InSimFlags | 0 = 0;

  /** The INSIM_VERSION used by your program */
  @byte() InSimVer = 0;

  /** Special host message prefix character */
  @string(1) Prefix = '';

  /** Time in ms between {@link IS_NLP} or {@link IS_MCI} (0 = none) */
  @word() Interval = 0;

  /** Admin password (if set in LFS) */
  @stringNull(16) Admin = '';

  /** A short name for your program */
  @stringNull(16) IName = '';

  constructor(data?: IS_ISI_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_ISI_Data = PacketDataWithOptionalReqI<IS_ISI>;

export enum IS_ISI_ReqI {
  ZERO,

  /** Send back an {@link IS_VER} packet */
  SEND_VERSION,
}

export enum InSimFlags {
  /** Spare */
  ISF_RES_0 = 1,

  /** Spare */
  ISF_RES_1 = 2,

  /** Guest or single player */
  ISF_LOCAL = 4,

  /** Keep colours in {@link IS_MSO} text */
  ISF_MSO_COLS = 8,

  /** Receive {@link IS_NLP} packets */
  ISF_NLP = 16,

  /** Receive {@link IS_MCI} packets */
  ISF_MCI = 32,

  /** Receive {@link IS_CON} packets */
  ISF_CON = 64,

  /** Receive {@link IS_OBH} packets */
  ISF_OBH = 128,

  /** Receive {@link IS_HLV} packets */
  ISF_HLV = 256,

  /** Receive {@link IS_AXM} when loading a layout */
  ISF_AXM_LOAD = 512,

  /** Receive {@link IS_AXM} when changing objects */
  ISF_AXM_EDIT = 1024,

  /** Process join requests */
  ISF_REQ_JOIN = 2048,
}
