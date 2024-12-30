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

  /**
   * User pressed O without anything selected
   *
   * An {@link IS_AXM} with PMO_POSITION is sent with a single object in the packet if a user
   * presses O without any object type selected. Information only - no object is added.
   * The only valid values in Info are X, Y, Zbyte and Heading.
   */
  PMO_POSITION,

  /**
   * Request Z values / reply with Z values
   *
   * `PMO_GET_Z` can be used to request the resulting Zbyte values for given X, Y, Zbyte
   * positions listed in the {@link IS_AXM}. A similar reply (information only) will be sent
   * with adjusted Zbyte values. Index and Heading are ignored and set to zero in the
   * reply. Flags is set to 0x80 if Zbyte was successfully adjusted, zero if not.
   * Suggested input values for Zbyte are either 240 to get the highest point at X, Y
   * or you may use the approximate altitude (see layout file format).
   */
  PMO_GET_Z,
}
