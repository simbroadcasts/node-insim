import { byte } from '../utils';
import { AbstractSendablePacket } from './AbstractSendablePacket';
import type { CarHCP } from './CarHCP';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * HandiCaPs
 *
 * You can send a packet to add mass and restrict the intake on each car model.
 * The same restriction applies to all drivers using a particular car model.
 * This can be useful for creating multi class hosts.
 */
export class IS_HCP extends AbstractSendablePacket {
  private static MAX_CARS = 32;

  @byte() readonly Size = 68;
  @byte() readonly Type = PacketType.ISP_HCP;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** H_Mass and H_TRes for each car: XF GTI = 0 / XR GT = 1 etc. */
  Info: CarHCP[] = [];

  constructor(data?: IS_HCP_Data) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    if (this.Info.length !== IS_HCP.MAX_CARS) {
      throw new RangeError(
        `IS_HCP - Info property must have exactly ${IS_HCP.MAX_CARS} items`,
      );
    }

    const dataBuffer = super.pack();
    const infoBuffer = this.Info.map((info) => info.pack());

    return Buffer.concat([dataBuffer, ...infoBuffer]);
  }
}

export type IS_HCP_Data = PacketData<IS_HCP>;
