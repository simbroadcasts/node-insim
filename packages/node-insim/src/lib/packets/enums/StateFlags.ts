export enum StateFlags {
  /** In game (or MPR) */
  ISS_GAME = 1,

  /** In SPR */
  ISS_REPLAY = 2,

  /** Paused */
  ISS_PAUSED = 4,

  /** SHIFT+U mode */
  ISS_SHIFTU = 8,

  /** In a dialog */
  ISS_DIALOG = 16,

  /** FOLLOW view */
  ISS_SHIFTU_FOLLOW = 32,

  /** SHIFT+U buttons hidden */
  ISS_SHIFTU_NO_OPT = 64,

  /** Showing 2d display */
  ISS_SHOW_2D = 128,

  /** Entry screen */
  ISS_FRONT_END = 256,

  /** Multiplayer mode */
  ISS_MULTI = 512,

  /** Multiplayer speedup option */
  ISS_MPSPEEDUP = 1024,

  /** LFS is running in a window */
  ISS_WINDOWED = 2048,

  /** Sound is switched off */
  ISS_SOUND_MUTE = 4096,

  /** Override user view */
  ISS_VIEW_OVERRIDE = 8192,

  /** InSim buttons visible */
  ISS_VISIBLE = 16384,

  /** In a text entry dialog */
  ISS_TEXT_ENTRY = 32768,
}
