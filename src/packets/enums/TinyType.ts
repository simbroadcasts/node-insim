export enum TinyType {
  /** Keep alive - maintain connection */
  TINY_NONE,

  /** Info request: get version */
  TINY_VER,

  /** Instruction: close insim */
  TINY_CLOSE,

  /** Ping request: external program requesting a reply */
  TINY_PING,

  /** Ping reply: reply to a ping request */
  TINY_REPLY,

  /** Both ways: game vote cancel (info or request) */
  TINY_VTC,

  /** Info request: send camera position */
  TINY_SCP,

  /** Info request: send state info */
  TINY_SST,

  /** Info request: get time in hundredths (i.e. {@link SMALL_RTP}) */
  TINY_GTH,

  /** Info: multi player end */
  TINY_MPE,

  /** Info request: get multiplayer info (i.e. {@link IS_ISM}) */
  TINY_ISM,

  /** Info: race end (return to race setup screen) */
  TINY_REN,

  /** Info: all players cleared from race */
  TINY_CLR,

  /** Info request: get {@link IS_NCN} for all connections */
  TINY_NCN,

  /** Info request: get all players */
  TINY_NPL,

  /** Info request: get all results */
  TINY_RES,

  /** Info request: send an {@link IS_NLP} */
  TINY_NLP,

  /** Info request: send an {@link IS_MCI} */
  TINY_MCI,

  /** Info request: send an {@link IS_REO} */
  TINY_REO,

  /** Info request: send an {@link IS_RST} */
  TINY_RST,

  /** Info request: send an {@link IS_AXI} - AutoX Info */
  TINY_AXI,

  /** Info: autocross cleared */
  TINY_AXC,

  /** Info request: send an {@link IS_RIP} - Replay Information Packet */
  TINY_RIP,

  /** Info request: get {@link IS_NCI} for all guests (on host only) */
  TINY_NCI,

  /** Info request: send a {@link SMALL_ALC} (allowed cars) */
  TINY_ALC,

  /** Info request: send {@link IS_AXM} packets for the entire layout */
  TINY_AXM,

  /** Info request: send {@link IS_SLC} packets for all connections */
  TINY_SLC,

  /** Info request: send {@link IS_MAL} listing the currently allowed mods */
  TINY_MAL,

  /** Info request: send {@link IS_PLH} listing player handicaps */
  TINY_PLH,
}
