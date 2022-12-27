export enum ReplayError {
  /** OK: completed instruction */
  RIP_OK,

  /** OK: already at the destination */
  RIP_ALREADY,

  /** Can't run a replay - dedicated host */
  RIP_DEDICATED,

  /** Can't start a replay - not in a suitable mode */
  RIP_WRONG_MODE,

  /** RName is zero but no replay is currently loaded */
  RIP_NOT_REPLAY,

  /** {@link IS_RIP} corrupted (e.g. RName does not end with zero) */
  RIP_CORRUPTED,

  /** The replay file was not found */
  RIP_NOT_FOUND,

  /** Obsolete / future / corrupted */
  RIP_UNLOADABLE,

  /** Destination is beyond replay length */
  RIP_DEST_OOB,

  /** Unknown error found starting replay */
  RIP_UNKNOWN,

  /** Replay search was terminated by user */
  RIP_USER,

  /** Can't reach destination - SPR is out of sync */
  RIP_OOS,
}
