import { byte, unsigned } from '../utils';
import { AbstractSendablePacket } from './AbstractSendablePacket';
import type { CarFlags } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * PLayer Cars
 *
 * You can send a packet to limit the cars that can be used by a given connection.
 * The resulting set of selectable cars is a subset of the cars set to be available
 * on the host (by the /cars command or {@link SMALL_ALC}).
 */
export class IS_PLC extends AbstractSendablePacket {
  @byte() readonly Size = 12;
  @byte() readonly Type = PacketType.ISP_PLC;
  @byte() readonly ReqI = 0;
  @byte() readonly Zero = 0;

  /** Connection's unique id (0 = host / 255 = all) */
  @byte() UCID = 0;

  @byte() readonly Sp1 = 0;
  @byte() readonly Sp2 = 0;
  @byte() readonly Sp3 = 0;

  /** Allowed cars */
  @unsigned() Cars: CarFlags = 0;

  constructor(data?: IS_PLC_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_PLC_Data = PacketData<IS_PLC>;
