import type {
  IR_HOS,
  IS_ACR,
  IS_AXI,
  IS_AXM,
  IS_AXO,
  IS_BFN,
  IS_BTC,
  IS_BTT,
  IS_CCH,
  IS_CIM,
  IS_CNL,
  IS_CON,
  IS_CPP,
  IS_CPR,
  IS_CRS,
  IS_CSC,
  IS_FIN,
  IS_FLG,
  IS_HLV,
  IS_III,
  IS_ISM,
  IS_JRR,
  IS_LAP,
  IS_MAL,
  IS_MCI,
  IS_MSO,
  IS_NCI,
  IS_NCN,
  IS_NLP,
  IS_NPL,
  IS_OBH,
  IS_PEN,
  IS_PFL,
  IS_PIT,
  IS_PLA,
  IS_PLL,
  IS_PLP,
  IS_PSF,
  IS_REO,
  IS_RES,
  IS_RIP,
  IS_RST,
  IS_SLC,
  IS_SMALL,
  IS_SPX,
  IS_SSH,
  IS_STA,
  IS_TINY,
  IS_TOC,
  IS_UCO,
  IS_VER,
  IS_VTN,
  PacketType,
} from '../../packets';
import type { InSim } from './InSim';

export type InSimPacketEvents = {
  [PacketType.ISP_VER]: (packet: IS_VER, inSim: InSim) => void;
  [PacketType.ISP_TINY]: (packet: IS_TINY, inSim: InSim) => void;
  [PacketType.ISP_SMALL]: (packet: IS_SMALL, inSim: InSim) => void;
  [PacketType.ISP_STA]: (packet: IS_STA, inSim: InSim) => void;
  [PacketType.ISP_CPP]: (packet: IS_CPP, inSim: InSim) => void;
  [PacketType.ISP_ISM]: (packet: IS_ISM, inSim: InSim) => void;
  [PacketType.ISP_MSO]: (packet: IS_MSO, inSim: InSim) => void;
  [PacketType.ISP_III]: (packet: IS_III, inSim: InSim) => void;
  [PacketType.ISP_VTN]: (packet: IS_VTN, inSim: InSim) => void;
  [PacketType.ISP_RST]: (packet: IS_RST, inSim: InSim) => void;
  [PacketType.ISP_NCN]: (packet: IS_NCN, inSim: InSim) => void;
  [PacketType.ISP_CNL]: (packet: IS_CNL, inSim: InSim) => void;
  [PacketType.ISP_CPR]: (packet: IS_CPR, inSim: InSim) => void;
  [PacketType.ISP_NPL]: (packet: IS_NPL, inSim: InSim) => void;
  [PacketType.ISP_PLP]: (packet: IS_PLP, inSim: InSim) => void;
  [PacketType.ISP_PLL]: (packet: IS_PLL, inSim: InSim) => void;
  [PacketType.ISP_LAP]: (packet: IS_LAP, inSim: InSim) => void;
  [PacketType.ISP_SPX]: (packet: IS_SPX, inSim: InSim) => void;
  [PacketType.ISP_PIT]: (packet: IS_PIT, inSim: InSim) => void;
  [PacketType.ISP_PSF]: (packet: IS_PSF, inSim: InSim) => void;
  [PacketType.ISP_PLA]: (packet: IS_PLA, inSim: InSim) => void;
  [PacketType.ISP_CCH]: (packet: IS_CCH, inSim: InSim) => void;
  [PacketType.ISP_PEN]: (packet: IS_PEN, inSim: InSim) => void;
  [PacketType.ISP_TOC]: (packet: IS_TOC, inSim: InSim) => void;
  [PacketType.ISP_FLG]: (packet: IS_FLG, inSim: InSim) => void;
  [PacketType.ISP_PFL]: (packet: IS_PFL, inSim: InSim) => void;
  [PacketType.ISP_FIN]: (packet: IS_FIN, inSim: InSim) => void;
  [PacketType.ISP_RES]: (packet: IS_RES, inSim: InSim) => void;
  [PacketType.ISP_REO]: (packet: IS_REO, inSim: InSim) => void;
  [PacketType.ISP_NLP]: (packet: IS_NLP, inSim: InSim) => void;
  [PacketType.ISP_MCI]: (packet: IS_MCI, inSim: InSim) => void;
  [PacketType.ISP_CRS]: (packet: IS_CRS, inSim: InSim) => void;
  [PacketType.ISP_BFN]: (packet: IS_BFN, inSim: InSim) => void;
  [PacketType.ISP_AXI]: (packet: IS_AXI, inSim: InSim) => void;
  [PacketType.ISP_AXO]: (packet: IS_AXO, inSim: InSim) => void;
  [PacketType.ISP_BTC]: (packet: IS_BTC, inSim: InSim) => void;
  [PacketType.ISP_BTT]: (packet: IS_BTT, inSim: InSim) => void;
  [PacketType.ISP_RIP]: (packet: IS_RIP, inSim: InSim) => void;
  [PacketType.ISP_SSH]: (packet: IS_SSH, inSim: InSim) => void;
  [PacketType.ISP_CON]: (packet: IS_CON, inSim: InSim) => void;
  [PacketType.ISP_OBH]: (packet: IS_OBH, inSim: InSim) => void;
  [PacketType.ISP_HLV]: (packet: IS_HLV, inSim: InSim) => void;
  [PacketType.ISP_AXM]: (packet: IS_AXM, inSim: InSim) => void;
  [PacketType.ISP_ACR]: (packet: IS_ACR, inSim: InSim) => void;
  [PacketType.ISP_NCI]: (packet: IS_NCI, inSim: InSim) => void;
  [PacketType.ISP_JRR]: (packet: IS_JRR, inSim: InSim) => void;
  [PacketType.ISP_UCO]: (packet: IS_UCO, inSim: InSim) => void;
  [PacketType.ISP_SLC]: (packet: IS_SLC, inSim: InSim) => void;
  [PacketType.ISP_CSC]: (packet: IS_CSC, inSim: InSim) => void;
  [PacketType.ISP_CIM]: (packet: IS_CIM, inSim: InSim) => void;
  [PacketType.ISP_MAL]: (packet: IS_MAL, inSim: InSim) => void;
  [PacketType.IRP_HOS]: (packet: IR_HOS, inSim: InSim) => void;
};

export type InSimEvents = InSimPacketEvents & {
  connect: () => void;
  disconnect: () => void;
};
