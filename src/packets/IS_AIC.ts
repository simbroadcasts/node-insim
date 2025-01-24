import { byte, word } from '../decorators';
import { SendablePacket } from './base';
import type { AICInput } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * AI Control
 */
export class IS_AIC extends SendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_AIC;
  @byte() ReqI = 0;
  @byte() readonly Zero = 0;

  /** Unique ID of AI player to control */
  @byte() PLID = 0;

  /** Select input value to set */
  @byte() Input: AICInput = 0;

  /** Value to set */
  @word() Value = 0;

  constructor(data?: IS_AIC_Data) {
    super();
    this.initialize(data);
  }
}

type OnOffValue = 0 | 1;

export type IS_AIC_Data = Omit<PacketData<IS_AIC>, 'Input' | 'Value'> &
  (
    | {
        Input: AICInput.CS_MSX;
        Value: number | AICSteering;
      }
    | {
        Input: AICInput.CS_CHUP;
        Value: OnOffValue;
      }
    | {
        Input: AICInput.CS_CHDN;
        Value: OnOffValue;
      }
    | {
        Input: AICInput.CS_IGNITION;
        Value: OnOffValue;
      }
    | {
        Input: AICInput.CS_EXTRALIGHT;
        Value: OnOffValue;
      }
    | {
        Input: AICInput.CS_HEADLIGHTS;
        Value: AICHeadlights;
      }
    | {
        Input: AICInput.CS_SIREN;
        Value: OnOffValue;
      }
    | {
        Input: AICInput.CS_HORN;
        Value: OnOffValue;
      }
    | {
        Input: AICInput.CS_FLASH;
        Value: OnOffValue;
      }
    | {
        Input: AICInput.CS_INDICATORS;
        Value: AICIndicators;
      }
    | {
        Input: AICInput.CS_GEAR;
        Value: AICGear;
      }
    | {
        Input: AICInput.CS_LOOK;
        Value: AICLook;
      }
    | {
        Input: AICInput.CS_PITSPEED;
        Value: OnOffValue;
      }
    | {
        Input: AICInput.CS_TCDISABLE;
        Value: OnOffValue;
      }
    | {
        Input: AICInput.CS_FOGREAR;
        Value: OnOffValue;
      }
    | {
        Input: AICInput.CS_FOGFRONT;
        Value: OnOffValue;
      }
  );

export enum AICSteering {
  CENTRE = 32768,
}

export enum AICHeadlights {
  /** All lights off */
  OFF = 1,

  /** Sidelights on */
  SIDE = 2,

  /** Low beam on */
  LOW = 3,

  /** High beam on */
  HIGH = 4,
}

export enum AICIndicators {
  /** All indicators off */
  CANCEL = 1,

  /** Left indicators on */
  LEFT = 2,

  /** Right indicators on */
  RIGHT = 3,

  /** All indicators on */
  HAZARD = 4,
}

export enum AICGear {
  REVERSE,
  NEUTRAL,
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
  FIFTH,
  SIXTH,
  SEVENTH,

  /** Use sequential shift control */
  SEQUENTIAL = 255,
}

export enum AICLook {
  NONE,

  /** Look left */
  LEFT = 4,

  /** Look left more */
  LEFT_PLUS = 5,

  /** Look right */
  RIGHT = 6,

  /** Look right more */
  RIGHT_PLUS = 7,
}
