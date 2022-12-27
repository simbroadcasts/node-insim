export enum ObjectHitFlags {
  /** An added object */
  OBH_LAYOUT = 1,

  /** A movable object */
  OBH_CAN_MOVE = 2,

  /** Was moving before this hit */
  OBH_WAS_MOVING = 4,

  /** Object in original position */
  OBH_ON_SPOT = 8,
}
