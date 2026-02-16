import { SendableStruct } from '../base/SendableStruct.js';
import { byte, char } from '../decorators.js';
import type { StructData } from '../types/StructData.js';

export class PlayerHCap extends SendableStruct {
  /** Player's unique id */
  @byte() PLID = 0;

  /** Bit 0: set Mass / bit 1: set TRes (e.g. Flags=3 to set both) - bit 7: silent */
  @byte() Flags: PlayerHCapFlags | 0 = 0;

  /** 0 to 200 - added mass (kg) */
  @byte() H_Mass = 0;

  /** 0 to 50 - intake restriction */
  @char() H_TRes = 0;

  constructor(data?: StructData<PlayerHCap>) {
    super();
    this.initialize(data);
  }
}

export enum PlayerHCapFlags {
  /** Set added mass */
  MASS = 1,

  /** Set intake restriction */
  INTAKE_RESTRICTION = 2,

  /** Avoid showing a message on player's screen */
  SILENT = 128,
}
