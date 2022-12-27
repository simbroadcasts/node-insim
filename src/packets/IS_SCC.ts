import { byte } from '../utils';
import { BaseSendablePacket } from './BaseSendablePacket';
import type { ViewIdentifier } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * Set Car Camera - Simplified camera packet (not SHIFT+U mode)
 */
export class IS_SCC extends BaseSendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_SCC;
  @byte() ReqI = 0;
  @byte() readonly Zero: 0 = 0;

  /** Unique ID of player to view */
  @byte() ViewPLID = 0;

  /** InGameCam (as reported in StatePack) */
  @byte() InGameCam: ViewIdentifier = 0;

  @byte() readonly Sp2: 0 = 0;
  @byte() readonly Sp3: 0 = 0;

  constructor(data?: IS_SCC_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_SCC_Data = PacketData<IS_SCC>;
