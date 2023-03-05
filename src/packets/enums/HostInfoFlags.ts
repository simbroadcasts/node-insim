export enum HostInfoFlags {
  /** Host requires a spectator password */
  HOS_SPECPASS = 1,

  /** Bit is set if host is licensed */
  HOS_LICENSED = 2,

  /** Bit is set if host is S1 */
  HOS_S1 = 4,

  /** Bit is set if host is S2 */
  HOS_S2 = 8,

  /** Bit is set if host is S3 */
  HOS_S3 = 16,

  /** Bit is set if host is Cruise */
  HOS_CRUISE = 32,

  /** Indicates the first host in the list */
  HOS_FIRST = 64,

  /** Indicates the last host in the list */
  HOS_LAST = 128,
}
