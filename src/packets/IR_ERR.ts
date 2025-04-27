import { byte } from '../decorators';
import { Packet } from './base';
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

export enum InSimRelayError {
  /** Invalid packet sent by client (wrong structure / length) */
  IR_ERR_PACKET = 1,

  /** Invalid packet sent by client (packet was not allowed to be forwarded to host) */
  IR_ERR_PACKET2,

  /** Wrong hostname given by client */
  IR_ERR_HOSTNAME,

  /** Wrong admin pass given by client */
  IR_ERR_ADMIN,

  /** Wrong spec pass given by client */
  IR_ERR_SPEC,

  /** Spectator pass required, but none given */
  IR_ERR_NOSPEC,
}
