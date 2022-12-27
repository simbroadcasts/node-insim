import { byte } from '../utils';
import { AbstractSendablePacket } from './base';
import type { ViewIdentifier } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * Set Car Camera - Simplified camera packet (not SHIFT+U mode)
 */
export class IS_SCC extends AbstractSendablePacket {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_SCC;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Unique ID of player to view */
  @byte() ViewPLID = 0;

  /** InGameCam (as reported in StatePack) */
  @byte() InGameCam: ViewIdentifier = 0;

  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;

  constructor(data?: IS_SCC_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_SCC_Data = PacketData<IS_SCC>;
