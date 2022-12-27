export enum PMOAction {
  /** Sent by the layout loading system only */
  PMO_LOADING_FILE,

  /** Adding objects (from InSim or editor) */
  PMO_ADD_OBJECTS,

  /** Delete objects (from InSim or editor) */
  PMO_DEL_OBJECTS,

  /** Clear all objects (NumO must be zero) */
  PMO_CLEAR_ALL,

  /** A reply to a {@link TINY_AXM} request */
  PMO_TINY_AXM,

  /** A reply to a {@link TTC_SEL} request */
  PMO_TTC_SEL,

  /** Set a connection's layout editor selection */
  PMO_SELECTION,

  /** User pressed O without anything selected */
  PMO_POSITION,

  /** Request Z values / reply with Z values */
  PMO_GET_Z,
}
