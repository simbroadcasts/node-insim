export enum NormalInterfaceSubmode {
  /** Not in a specific view */
  NRM_NORMAL,

  /** User is viewing the car's wheel temperature (F9) */
  NRM_WHEEL_TEMPS,

  /** User is viewing the car's wheel damage (F10) */
  NRM_WHEEL_DAMAGE,

  /** User is viewing the setting pane for the car (F11) */
  NRM_LIVE_SETTINGS,

  /** User is viewing the pit instructions pane (F12) */
  NRM_PIT_INSTRUCTIONS,
}
