export enum HLVCViolation {
  /** Car drove off track */
  GROUND = 0,

  /** Car hit a wall */
  WALL = 1,

  /** Car was speeding in pit lane */
  SPEEDING = 4,

  /** Car went out of bounds */
  OUT_OF_BOUNDS = 5,
}
