import { byte } from '../decorators';
import { SendablePacket } from './base';
import { ObjectIndex, PacketType } from './enums';
import type { PacketData } from './types';

/**
 * Object COntrol - currently used for switching start lights
 */
export class IS_OCO extends SendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_OCO;
  @byte() readonly ReqI = 0;
  @byte() private readonly Zero = 0;

  @byte() OCOAction: OCOAction = OCOAction.OCO_ZERO;

  /** Specifies which lights you want to override **/
  @byte() Index: ObjectIndex = ObjectIndex.AXO_NULL;

  /**
   * Identify particular start lights objects (0 to 63 or 255 = all)
   *
   * Identifier byte can be used to override groups of temporary start lights.
   * It refers to the temporary lights identifier (0 to 63) seen in the layout editor.
   */
  @byte() Identifier = 0;

  /**
   * Specifies particular bulbs using the low 4 bits
   *
   * Bulb bit values for the currently available lights:
   *
   * {@link OCO_INDEX_MAIN}
   *
   * - bit 0 (1): red1
   * - bit 1 (2): red2
   * - bit 2 (4): red3
   * - bit 3 (8): green
   *
   * {@link AXO_START_LIGHTS}
   *
   * - bit 0 (1): red
   * - bit 1 (2): amber
   * - bit 3 (8): green
   */
  @byte() Data: OCOMainLights | OCOAutocrossStartLights | 0 = 0;

  constructor(data?: IS_OCO_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_OCO_Data = PacketData<IS_OCO>;

export enum OCOAction {
  /** Reserved */
  OCO_ZERO,

  /** Give up control of all lights */
  OCO_LIGHTS_RESET = 4,

  /** Use Data byte to set the bulbs */
  OCO_LIGHTS_SET = 5,

  /** Give up control of the specified lights */
  OCO_LIGHTS_UNSET = 6,
}

export enum OCOAutocrossStartLights {
  RED = 1,
  AMBER = 2,
  GREEN = 8,
}

export enum OCOMainLights {
  RED_1 = 1,
  RED_2 = 2,
  RED_3 = 4,
  GREEN = 8,
}
