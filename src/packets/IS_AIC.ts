import { byte, word } from '../decorators';
import { SendablePacket, SendableStruct } from './base';
import type { PlayerFlags } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * AI Control
 */
export class IS_AIC extends SendablePacket {
  public static readonly MAX_INPUTS = 20; // NOTE: Increase if CS_NUM is increased

  /** 4 + 4 * (number of inputs) */
  @byte() Size = 8;

  @byte() readonly Type = PacketType.ISP_AIC;

  /** Optional - returned in any immediate response e.g. reply to {@link CS_SEND_AI_INFO} */
  @byte() ReqI = 0;

  /** Unique ID of AI player to control */
  @byte() PLID = 0;

  /**
   * Inputs in {@link AIInputVal} marked 'hold' must be set back to zero after some time.
   * This can be done either by use of the Time field or by sending a later packet with Value = 0.
   *
   * E.g. Set Time to 10 when issuing a {@link CS_CHUP} - hold shift up lever for 0.1 sec.
   *
   * E.g. Set Time to 50 when issuing a {@link CS_HORN} - sound horn for 0.5 sec.
   */
  Inputs: AIInputVal[] = [];

  private readonly inputsOffset = 4;

  constructor(data?: IS_AIC_Data) {
    super();
    this.initialize(data);
  }

  pack() {
    if (this.Inputs.length > IS_AIC.MAX_INPUTS) {
      throw new RangeError(
        `IS_AIC - Too many inputs set (max is ${IS_AIC.MAX_INPUTS}`,
      );
    }

    const inputLength = new AIInputVal().getFormatSize();
    this.Size = this.inputsOffset + this.Inputs.length * inputLength;

    const dataBuffer = super.pack();
    const objectInfoBuffer = this.Inputs.reduce(
      (acc, input) => new Uint8Array([...acc, ...input.pack()]),
      new Uint8Array(),
    );

    return new Uint8Array([...dataBuffer, ...objectInfoBuffer]);
  }
}

export class AIInputVal extends SendableStruct {
  /** Select input value to set
   *
   * Inputs marked 'hold' must be set back to zero after some time.
   * This can be done either by use of the Time field or by sending a later packet with Value = 0.
   *
   * E.g. Set Time to 10 when issuing a {@link CS_CHUP} - hold shift up lever for 0.1 sec.
   *
   * E.g. Set Time to 50 when issuing a {@link CS_HORN} - sound horn for 0.5 sec.
   */
  @byte() Input: AICInput = 0;

  /**
   * Time to hold (optional, hundredths of a second)
   *
   * If the Time value is set, that input will return to default after that time.
   * This is probably most useful for {@link CS_CHUP} / {@link CS_CHDN} / {@link CS_FLASH} / {@link CS_HORN} inputs.
   * If you don't use Time then you should send another packet to zero the input.
   */
  @byte() Time = 0;

  /** Value to set */
  @word() Value = 0;

  constructor(data?: AIInputValData) {
    super();
    this.initialize(data);
  }
}

export type AIInputValData =
  | {
      Input: AICInput.CS_MSX;
      Time?: number;
      Value: number | AICSteering;
    }
  | {
      Input: AICInput.CS_BRAKE;
      Time?: number;
      Value: number;
    }
  | {
      Input: AICInput.CS_THROTTLE;
      Time?: number;
      Value: number;
    }
  | {
      Input: AICInput.CS_CHUP;
      Time?: number;
      Value: OnOffValue;
    }
  | {
      Input: AICInput.CS_CHDN;
      Time?: number;
      Value: OnOffValue;
    }
  | {
      Input: AICInput.CS_IGNITION;
      Time?: number;
      Value: AICToggleValue;
    }
  | {
      Input: AICInput.CS_EXTRALIGHT;
      Time?: number;
      Value: AICToggleValue;
    }
  | {
      Input: AICInput.CS_HEADLIGHTS;
      Time?: number;
      Value: AICHeadlights;
    }
  | {
      Input: AICInput.CS_SIREN;
      Time?: number;
      Value: OnOffValue;
    }
  | {
      Input: AICInput.CS_HORN;
      Time?: number;
      Value: 1 | 2 | 3 | 4 | 5;
    }
  | {
      Input: AICInput.CS_FLASH;
      Time?: number;
      Value: OnOffValue;
    }
  | {
      Input: AICInput.CS_CLUTCH;
      Time?: number;
      Value: number;
    }
  | {
      Input: AICInput.CS_HANDBRAKE;
      Time?: number;
      Value: number;
    }
  | {
      Input: AICInput.CS_INDICATORS;
      Time?: number;
      Value: AICIndicators;
    }
  | {
      Input: AICInput.CS_GEAR;
      Time?: number;
      Value: AICGear;
    }
  | {
      Input: AICInput.CS_LOOK;
      Time?: number;
      Value: AICLook;
    }
  | {
      Input: AICInput.CS_PITSPEED;
      Time?: number;
      Value: AICToggleValue;
    }
  | {
      Input: AICInput.CS_TCDISABLE;
      Time?: number;
      Value: AICToggleValue;
    }
  | {
      Input: AICInput.CS_FOGREAR;
      Time?: number;
      Value: AICToggleValue;
    }
  | {
      Input: AICInput.CS_FOGFRONT;
      Time?: number;
      Value: AICToggleValue;
    }
  | {
      Input: AICInput.CS_SEND_AI_INFO;
      Time?: never;
    }
  | {
      Input: AICInput.CS_REPEAT_AI_INFO;
      Time: number;
    }
  | {
      Input: AICInput.CS_SET_HELP_FLAGS;
      Time?: never;
      Value: PlayerFlags;
    }
  | {
      Input: AICInput.CS_RESET_INPUTS;
      Time?: never;
    }
  | {
      Input: AICInput.CS_STOP_CONTROL;
      Time?: never;
    };

type OnOffValue = 0 | 1;

export enum AICToggleValue {
  TOGGLE = 1,
  SWITCH_ON = 2,
  SWITCH_OFF = 3,
}

export type IS_AIC_Data = PacketData<IS_AIC>;

export enum AICSteering {
  HARD_LEFT = 1,
  CENTRE = 32768,
  HARD_RIGHT = 65535,
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

/**
 * Inputs marked 'hold' must be set back to zero after some time.
 * This can be done either by use of the Time field or by sending a later packet with Value = 0.
 *
 * E.g. Set Time to 10 when issuing a {@link CS_CHUP} - hold shift up lever for 0.1 sec.
 *
 * E.g. Set Time to 50 when issuing a {@link CS_HORN} - sound horn for 0.5 sec.
 */
export enum AICInput {
  /** Steer: 1 hard left / 32768 centre / 65535 hard right */
  CS_MSX,

  /** Throttle */
  CS_THROTTLE,

  /** Brake */
  CS_BRAKE,

  /** Hold shift up lever */
  CS_CHUP,

  /** Hold shift down lever */
  CS_CHDN,

  /** Ignition: 1 toggle / 2 switch off / 3 switch on */
  CS_IGNITION,

  /** Extra light: 1 toggle / 2 switch off / 3 switch on */
  CS_EXTRALIGHT,

  /** Headlights: 1: off / 2: side / 3: low / 4: high */
  CS_HEADLIGHTS,

  /** Siren */
  CS_SIREN,

  /** Hold horn - 1 to 5 */
  CS_HORN,

  /** Hold flash */
  CS_FLASH,

  /** Clutch */
  CS_CLUTCH,

  /** Handbrake */
  CS_HANDBRAKE,

  /** 1: cancel / 2: left / 3: right / 4: hazard */
  CS_INDICATORS,

  /** Gear for shifter (leave at 255 for sequential control) */
  CS_GEAR,

  /** Look: 0: none / 4: left / 5: left+ / 6: right / 7: right+ */
  CS_LOOK,

  /** Pit speed limiter: 1 toggle / 2 switch off / 3 switch on */
  CS_PITSPEED,

  /** Traction control disable: 1 toggle / 2 switch off / 3 switch on */
  CS_TCDISABLE,

  /** Rear fog light: 1 toggle / 2 switch off / 3 switch on */
  CS_FOGREAR,

  /** Front fog light: 1 toggle / 2 switch off / 3 switch on */
  CS_FOGFRONT,

  CS_NUM,

  /** Send an {@link IS_AII} (AI Info) packet */
  CS_SEND_AI_INFO = 240,

  /**
   * Start or stop sending regular {@link IS_AII} packets
   * Time = time interval in hundredths of a second (0 : stop)
   */
  CS_REPEAT_AI_INFO = 241,

  /** Set help flags.
   *
   * Value can be any combination of
   * - {@link PIF_AUTOGEARS}
   * - {@link PIF_HELP_B}
   * - {@link PIF_AUTOCLUTCH}
   *
   * Default value for an AI driver is {@link PIF_AUTOCLUTCH} only.
   * If you set {@link PIF_AUTOGEARS} you don't need to set {@link PIF_AUTOCLUTCH}.
   */
  CS_SET_HELP_FLAGS = 253,

  /**
   * Reset all inputs
   *
   * Most inputs are zero / {@link CS_MSX} is 32768 / {@link CS_GEAR} is 255
   */
  CS_RESET_INPUTS = 254,

  /**
   * Stop control
   *
   * The AI driver will stop the car.
   */
  CS_STOP_CONTROL = 255,
}
