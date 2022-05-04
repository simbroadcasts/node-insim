import { Byte, ReqI } from '../types';
import { createLog } from '../utils';
import { BaseSendablePacket } from './BaseSendablePacket';
import { byte, unsigned } from './decorators';
import { TinyType } from './IS_TINY';
import { PacketType } from './packetTypes';

const log = createLog('IS_SMALL');

export class IS_SMALL extends BaseSendablePacket implements IS_SMALL_Data {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_SMALL;

  /** 0 unless it is an info request or a reply to an info request */
  @byte() ReqI: Byte = 0;

  /** Subtype */
  @byte() SubT: SmallType = SmallType.SMALL_NONE;

  /** Value (e.g. for {@link SMALL_SSP} this would be the OutSim packet rate) */
  @unsigned() UVal = 0;

  constructor(data?: IS_SMALL_ConstructorData | Buffer) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    if (
      this.ReqI === 0 &&
      SENDABLE_SMALL_TYPES.includes(this.SubT as SendableSmallType)
    ) {
      log.error(`${TinyType[this.SubT]} - ReqI must be greater than 0`);
    }

    return super.pack();
  }
}

export type IS_SMALL_Data = {
  /** 0 unless it is an info request or a reply to an info request */
  ReqI: Byte;

  /** Subtype */
  SubT: SmallType;

  /** Value (e.g. for {@link SMALL_SSP} this would be the OutSim packet rate) */
  UVal: number;
};

type IS_SMALL_ConstructorData = {
  /** 0 unless it is an info request or a reply to an info request */
  ReqI: ReqI;

  /** Subtype */
  SubT: SendableSmallType;

  /** Value (e.g. for {@link SMALL_SSP} this would be the OutSim packet rate) */
  UVal: number;
};

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

  /** Instruction: set local car switches (lights, horn, siren) */
  SMALL_LCS,
}

const SENDABLE_SMALL_TYPES = [
  SmallType.SMALL_SSP,
  SmallType.SMALL_SSG,
  SmallType.SMALL_TMS,
  SmallType.SMALL_STP,
  SmallType.SMALL_NLI,
  SmallType.SMALL_ALC,
  SmallType.SMALL_LCS,
];

type SendableSmallType = typeof SENDABLE_SMALL_TYPES[number];
