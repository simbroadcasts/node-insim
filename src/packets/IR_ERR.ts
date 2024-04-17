import { byte } from '../decorators';
import { Packet } from './base';
import type { InSimRelayError } from './enums';
import { PacketType } from './enums';

/**
 * ERRor
 *
 * If you specify a wrong value, like invalid packet / hostname / adminpass / specpass,
 * the Relay returns an error packet.
 */
export class IR_ERR extends Packet {
  @byte() readonly Size = 4;
  @byte() readonly Type = PacketType.IRP_ERR;

  /** As given in {@link IR_SEL}, otherwise 0 */
  @byte() ReqI = 0;

  /** Error number */
  @byte() ErrNo: InSimRelayError | 0 = 0;
}
