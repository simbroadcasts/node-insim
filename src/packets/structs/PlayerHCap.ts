import { byte, char } from '../../decorators';
import { SendableStruct } from '../base';
import type { PlayerHCapFlags } from '../enums';
import type { StructData } from '../types';

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
