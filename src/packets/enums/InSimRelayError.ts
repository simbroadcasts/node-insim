export enum InSimRelayError {
  /** Invalid packet sent by client (wrong structure / length) */
  IR_ERR_PACKET,

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
