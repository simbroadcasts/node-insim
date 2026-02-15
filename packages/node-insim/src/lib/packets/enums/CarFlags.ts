export enum CarFlags {
  /** No cars */
  NONE = 0,

  /** XF GTI */
  XFG = 1,

  /** XR GT */
  XRG = 2,

  /** XR GT TURBO */
  XRT = 4,

  /** RB4 GT */
  RB4 = 8,

  /** FXO TURBO */
  FXO = 0x10,

  /** LX4 */
  LX4 = 0x20,

  /** LX6 */
  LX6 = 0x40,

  /** MRT5 */
  MRT = 0x80,

  /** UF 1000 */
  UF1 = 0x100,

  /** RACEABOUT */
  RAC = 0x200,

  /** FZ50 */
  FZ5 = 0x400,

  /** FORMULA XR */
  FOX = 0x800,

  /** XF GTR */
  XFR = 0x1000,

  /** UF GTR */
  UFR = 0x2000,

  /** FORMULA V8 */
  FO8 = 0x4000,

  /** FXO GTR */
  FXR = 0x8000,

  /** XR GTR */
  XRR = 0x10000,

  /** FZ50 GTR */
  FZR = 0x20000,

  /** BMW SAUBER F1.06 */
  BF1 = 0x40000,

  /** FORMULA BMW FB02 */
  FBM = 0x80000,

  /** All cars */
  ALL = 0xffffffff,
}
