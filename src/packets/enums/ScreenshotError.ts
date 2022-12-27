export enum ScreenshotError {
  /** OK: completed instruction */
  SSH_OK,

  /** Can't save a screenshot - dedicated host */
  SSH_DEDICATED,

  /** IS_SSH corrupted (e.g. Name does not end with zero) */
  SSH_CORRUPTED,

  /** Could not save the screenshot */
  SSH_NO_SAVE,
}
