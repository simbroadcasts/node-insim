export enum InSimFlags {
  /** Spare */
  ISF_RES_0 = 1,

  /** Spare */
  ISF_RES_1 = 2,

  /** Guest or single player */
  ISF_LOCAL = 4,

  /** Keep colours in {@link IS_MSO} text */
  ISF_MSO_COLS = 8,

  /** Receive {@link IS_NLP} packets */
  ISF_NLP = 16,

  /** Receive {@link IS_MCI} packets */
  ISF_MCI = 32,

  /** Receive {@link IS_CON} packets */
  ISF_CON = 64,

  /** Receive {@link IS_OBH} packets */
  ISF_OBH = 128,

  /** Receive {@link IS_HLV} packets */
  ISF_HLV = 256,

  /** Receive {@link IS_AXM} when loading a layout */
  ISF_AXM_LOAD = 512,

  /** Receive {@link IS_AXM} when changing objects */
  ISF_AXM_EDIT = 1024,

  /** Process join requests */
  ISF_REQ_JOIN = 2048,
}
