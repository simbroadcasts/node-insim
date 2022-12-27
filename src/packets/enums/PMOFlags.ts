export enum PMOFlags {
  /**
   * If PMO_FILE_END is set in a {@link PMO_LOADING_FILE} packet, LFS has reached
   * the end of a layout file which it is loading. The added objects will then be
   * optimised.
   **/
  PMO_FILE_END = 1,

  /**
   * When objects are moved or modified in the layout editor, two {@link IS_AXM} packets
   * are sent. A {@link PMO_DEL_OBJECTS} followed by a {@link PMO_ADD_OBJECTS}. In this
   * case the flag {@link PMO_MOVE_MODIFY} is set in the {@link PMOFlags} byte of both
   * packets.
   **/
  PMO_MOVE_MODIFY = 2,

  /**
   * If you send an {@link IS_AXM} with {@link PMOAction} of {@link PMO_SELECTION} it is
   * possible for it to be either a selection of real objects (as if the user selected
   * several objects while holding the CTRL key) or a clipboard selection (as if the user
   * pressed CTRL+C after selecting objects). Clipboard is the default selection mode.
   * A real selection can be set by using the {@link PMO_SELECTION_REAL} bit in the
   * {@link PMOFlags} byte.
   **/
  PMO_SELECTION_REAL = 4,

  /**
   * If you send an {@link IS_AXM} with {@link PMOAction} of {@link PMO_ADD_OBJECTS}
   * you may wish to set the UCID to one of the guest connections (for example if that
   * user's action caused the objects to be added). In this case some validity checks
   * are done on the guest's computer which may report "invalid position" or
   * "intersecting object" and delete the objects. This can be avoided by setting the
   * {@link PMO_AVOID_CHECK} bit.
   **/
  PMO_AVOID_CHECK = 8,
}
