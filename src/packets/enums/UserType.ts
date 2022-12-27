export enum UserType {
  /** System message */
  MSO_SYSTEM,

  /** Normal visible user message */
  MSO_USER,

  /** hidden message starting with special prefix (see {@link IS_ISI}) */
  MSO_PREFIX,

  /** Hidden message typed on local pc with /o command */
  MSO_O,
}
