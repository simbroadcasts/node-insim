export enum CarContactFlags {
  /** This car is in the way of a driver who is a lap ahead */
  CCI_BLUE = 1,

  /** This car is slow or stopped and in a dangerous place */
  CCI_YELLOW = 2,

  /** This car is lagging (missing or delayed position packets) */
  CCI_LAG = 32,
}
