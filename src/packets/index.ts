import { Packet } from './base';
import { PacketType } from './enums';
import { IR_ARP } from './IR_ARP';
import { IR_ARQ } from './IR_ARQ';
import { IR_ERR } from './IR_ERR';
import { IR_HLR } from './IR_HLR';
import { IR_HOS } from './IR_HOS';
import { IR_SEL } from './IR_SEL';
import { IS_ACR } from './IS_ACR';
import { IS_AXI } from './IS_AXI';
import { IS_AXM } from './IS_AXM';
import { IS_AXO } from './IS_AXO';
import { IS_BFN } from './IS_BFN';
import { IS_BTC } from './IS_BTC';
import { IS_BTN } from './IS_BTN';
import { IS_BTT } from './IS_BTT';
import { IS_CCH } from './IS_CCH';
import { IS_CIM } from './IS_CIM';
import { IS_CNL } from './IS_CNL';
import { IS_CON } from './IS_CON';
import { IS_CPP } from './IS_CPP';
import { IS_CPR } from './IS_CPR';
import { IS_CRS } from './IS_CRS';
import { IS_CSC } from './IS_CSC';
import { IS_FIN } from './IS_FIN';
import { IS_FLG } from './IS_FLG';
import { IS_HCP } from './IS_HCP';
import { IS_HLV } from './IS_HLV';
import { IS_III } from './IS_III';
import { IS_ISI } from './IS_ISI';
import { IS_ISM } from './IS_ISM';
import { IS_JRR } from './IS_JRR';
import { IS_LAP } from './IS_LAP';
import { IS_MAL } from './IS_MAL';
import { IS_MCI } from './IS_MCI';
import { IS_MOD } from './IS_MOD';
import { IS_MSL } from './IS_MSL';
import { IS_MSO } from './IS_MSO';
import { IS_MST } from './IS_MST';
import { IS_MSX } from './IS_MSX';
import { IS_MTC } from './IS_MTC';
import { IS_NCI } from './IS_NCI';
import { IS_NCN } from './IS_NCN';
import { IS_NLP } from './IS_NLP';
import { IS_NPL } from './IS_NPL';
import { IS_OBH } from './IS_OBH';
import { IS_OCO } from './IS_OCO';
import { IS_PEN } from './IS_PEN';
import { IS_PFL } from './IS_PFL';
import { IS_PIT } from './IS_PIT';
import { IS_PLA } from './IS_PLA';
import { IS_PLC } from './IS_PLC';
import { IS_PLL } from './IS_PLL';
import { IS_PLP } from './IS_PLP';
import { IS_PSF } from './IS_PSF';
import { IS_REO } from './IS_REO';
import { IS_RES } from './IS_RES';
import { IS_RIP } from './IS_RIP';
import { IS_RST } from './IS_RST';
import { IS_SCC } from './IS_SCC';
import { IS_SCH } from './IS_SCH';
import { IS_SFP } from './IS_SFP';
import { IS_SLC } from './IS_SLC';
import { IS_SMALL } from './IS_SMALL';
import { IS_SPX } from './IS_SPX';
import { IS_SSH } from './IS_SSH';
import { IS_STA } from './IS_STA';
import { IS_TINY } from './IS_TINY';
import { IS_TOC } from './IS_TOC';
import { IS_TTC } from './IS_TTC';
import { IS_UCO } from './IS_UCO';
import { IS_VER } from './IS_VER';
import { IS_VTN } from './IS_VTN';

export const packetTypeToClass: Record<PacketType, new () => Packet> = {
  [PacketType.ISP_NONE]: class A extends Packet {
    ReqI = 0;
    Size = 0;
    Type = 0;
  },
  [PacketType.ISP_ISI]: IS_ISI,
  [PacketType.ISP_VER]: IS_VER,
  [PacketType.ISP_TINY]: IS_TINY,
  [PacketType.ISP_SMALL]: IS_SMALL,
  [PacketType.ISP_STA]: IS_STA,
  [PacketType.ISP_SCH]: IS_SCH,
  [PacketType.ISP_SFP]: IS_SFP,
  [PacketType.ISP_SCC]: IS_SCC,
  [PacketType.ISP_CPP]: IS_CPP,
  [PacketType.ISP_ISM]: IS_ISM,
  [PacketType.ISP_MSO]: IS_MSO,
  [PacketType.ISP_III]: IS_III,
  [PacketType.ISP_MST]: IS_MST,
  [PacketType.ISP_MTC]: IS_MTC,
  [PacketType.ISP_MOD]: IS_MOD,
  [PacketType.ISP_VTN]: IS_VTN,
  [PacketType.ISP_RST]: IS_RST,
  [PacketType.ISP_NCN]: IS_NCN,
  [PacketType.ISP_CNL]: IS_CNL,
  [PacketType.ISP_CPR]: IS_CPR,
  [PacketType.ISP_NPL]: IS_NPL,
  [PacketType.ISP_PLP]: IS_PLP,
  [PacketType.ISP_PLL]: IS_PLL,
  [PacketType.ISP_LAP]: IS_LAP,
  [PacketType.ISP_SPX]: IS_SPX,
  [PacketType.ISP_PIT]: IS_PIT,
  [PacketType.ISP_PSF]: IS_PSF,
  [PacketType.ISP_PLA]: IS_PLA,
  [PacketType.ISP_CCH]: IS_CCH,
  [PacketType.ISP_PEN]: IS_PEN,
  [PacketType.ISP_TOC]: IS_TOC,
  [PacketType.ISP_FLG]: IS_FLG,
  [PacketType.ISP_PFL]: IS_PFL,
  [PacketType.ISP_FIN]: IS_FIN,
  [PacketType.ISP_RES]: IS_RES,
  [PacketType.ISP_REO]: IS_REO,
  [PacketType.ISP_NLP]: IS_NLP,
  [PacketType.ISP_MCI]: IS_MCI,
  [PacketType.ISP_MSX]: IS_MSX,
  [PacketType.ISP_MSL]: IS_MSL,
  [PacketType.ISP_CRS]: IS_CRS,
  [PacketType.ISP_BFN]: IS_BFN,
  [PacketType.ISP_AXI]: IS_AXI,
  [PacketType.ISP_AXO]: IS_AXO,
  [PacketType.ISP_BTN]: IS_BTN,
  [PacketType.ISP_BTC]: IS_BTC,
  [PacketType.ISP_BTT]: IS_BTT,
  [PacketType.ISP_RIP]: IS_RIP,
  [PacketType.ISP_SSH]: IS_SSH,
  [PacketType.ISP_CON]: IS_CON,
  [PacketType.ISP_OBH]: IS_OBH,
  [PacketType.ISP_HLV]: IS_HLV,
  [PacketType.ISP_PLC]: IS_PLC,
  [PacketType.ISP_AXM]: IS_AXM,
  [PacketType.ISP_ACR]: IS_ACR,
  [PacketType.ISP_HCP]: IS_HCP,
  [PacketType.ISP_NCI]: IS_NCI,
  [PacketType.ISP_JRR]: IS_JRR,
  [PacketType.ISP_UCO]: IS_UCO,
  [PacketType.ISP_OCO]: IS_OCO,
  [PacketType.ISP_TTC]: IS_TTC,
  [PacketType.ISP_SLC]: IS_SLC,
  [PacketType.ISP_CSC]: IS_CSC,
  [PacketType.ISP_CIM]: IS_CIM,
  [PacketType.ISP_MAL]: IS_MAL,
  [PacketType.IRP_ARQ]: IR_ARQ,
  [PacketType.IRP_ARP]: IR_ARP,
  [PacketType.IRP_HLR]: IR_HLR,
  [PacketType.IRP_HOS]: IR_HOS,
  [PacketType.IRP_SEL]: IR_SEL,
  [PacketType.IRP_ERR]: IR_ERR,
};
export { PacketType };
export * from './base';
export * from './enums';
export { IR_ARP } from './IR_ARP';
export type { IR_ARQ_Data } from './IR_ARQ';
export { IR_ARQ } from './IR_ARQ';
export { IR_ERR } from './IR_ERR';
export type { IR_HLR_Data } from './IR_HLR';
export { IR_HLR } from './IR_HLR';
export { IR_HOS } from './IR_HOS';
export type { IR_SEL_Data } from './IR_SEL';
export { IR_SEL, IR_SEL_ReqI } from './IR_SEL';
export { IS_ACR } from './IS_ACR';
export { IS_AXI } from './IS_AXI';
export type { IS_AXM_Data } from './IS_AXM';
export { IS_AXM } from './IS_AXM';
export { IS_AXO } from './IS_AXO';
export type { IS_BFN_Data } from './IS_BFN';
export { IS_BFN } from './IS_BFN';
export { IS_BTC } from './IS_BTC';
export type { IS_BTN_Data } from './IS_BTN';
export { IS_BTN } from './IS_BTN';
export { IS_BTT } from './IS_BTT';
export { IS_CCH } from './IS_CCH';
export { IS_CIM } from './IS_CIM';
export { IS_CNL } from './IS_CNL';
export { IS_CON } from './IS_CON';
export type { AllowedStateFlags, IS_CPP_Data } from './IS_CPP';
export { IS_CPP } from './IS_CPP';
export { IS_CPR } from './IS_CPR';
export { IS_CRS } from './IS_CRS';
export { IS_CSC } from './IS_CSC';
export { IS_FIN } from './IS_FIN';
export { IS_FLG } from './IS_FLG';
export type { IS_HCP_Data } from './IS_HCP';
export { IS_HCP } from './IS_HCP';
export { IS_HLV } from './IS_HLV';
export { IS_III } from './IS_III';
export type { IS_ISI_Data } from './IS_ISI';
export { IS_ISI, IS_ISI_ReqI } from './IS_ISI';
export { IS_ISM, MultiplayerHostMode } from './IS_ISM';
export type { IS_JRR_Data } from './IS_JRR';
export { IS_JRR } from './IS_JRR';
export { IS_LAP } from './IS_LAP';
export type { IS_MAL_Data } from './IS_MAL';
export { IS_MAL } from './IS_MAL';
export { IS_MCI } from './IS_MCI';
export type { IS_MOD_Data } from './IS_MOD';
export { IS_MOD } from './IS_MOD';
export type { IS_MSL_Data } from './IS_MSL';
export { IS_MSL } from './IS_MSL';
export { IS_MSO } from './IS_MSO';
export type { IS_MST_Data } from './IS_MST';
export { IS_MST } from './IS_MST';
export type { IS_MSX_Data } from './IS_MSX';
export { IS_MSX } from './IS_MSX';
export type { IS_MTC_Data } from './IS_MTC';
export { IS_MTC } from './IS_MTC';
export { IS_NCI } from './IS_NCI';
export { IS_NCN } from './IS_NCN';
export { IS_NLP } from './IS_NLP';
export { IS_NPL } from './IS_NPL';
export { IS_OBH } from './IS_OBH';
export type { IS_OCO_Data } from './IS_OCO';
export { IS_OCO } from './IS_OCO';
export { IS_PEN } from './IS_PEN';
export { IS_PFL } from './IS_PFL';
export { IS_PIT } from './IS_PIT';
export { IS_PLA } from './IS_PLA';
export type { IS_PLC_Data } from './IS_PLC';
export { IS_PLC } from './IS_PLC';
export { IS_PLL } from './IS_PLL';
export { IS_PLP } from './IS_PLP';
export { IS_PSF } from './IS_PSF';
export type { IS_REO_Data } from './IS_REO';
export { IS_REO } from './IS_REO';
export { IS_RES } from './IS_RES';
export type { IS_RIP_Data } from './IS_RIP';
export { IS_RIP } from './IS_RIP';
export { IS_RST } from './IS_RST';
export type { IS_SCC_Data } from './IS_SCC';
export { IS_SCC } from './IS_SCC';
export type { IS_SCH_Data } from './IS_SCH';
export { IS_SCH } from './IS_SCH';
export type { IS_SFP_Data, SendableStateFlags } from './IS_SFP';
export { IS_SFP } from './IS_SFP';
export { IS_SLC } from './IS_SLC';
export type { IS_SMALL_Data } from './IS_SMALL';
export type { SendableSmallType } from './IS_SMALL';
export { IS_SMALL, SENDABLE_SMALL_TYPES } from './IS_SMALL';
export { IS_SPX } from './IS_SPX';
export type { IS_SSH_Data } from './IS_SSH';
export { IS_SSH } from './IS_SSH';
export { IS_STA } from './IS_STA';
export type {
  InfoRequestTinyType,
  IS_TINY_Data,
  SendableTinyType,
} from './IS_TINY';
export {
  INFO_REQUEST_TINY_TYPES,
  IS_TINY,
  SENDABLE_TINY_TYPES,
} from './IS_TINY';
export { IS_TOC } from './IS_TOC';
export type { IS_TTC_Data } from './IS_TTC';
export { IS_TTC } from './IS_TTC';
export { IS_UCO } from './IS_UCO';
export { IS_VER } from './IS_VER';
export { IS_VTN } from './IS_VTN';
export * from './structs';
export * from './types';
