import { PacketType } from './enums';
import { IS_ACR } from './IS_ACR';
import { IS_AIC } from './IS_AIC';
import { IS_AII } from './IS_AII';
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
import { IS_IPB } from './IS_IPB';
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
import { IS_NONE } from './IS_NONE';
import { IS_NPL } from './IS_NPL';
import { IS_OBH } from './IS_OBH';
import { IS_OCO } from './IS_OCO';
import { IS_PEN } from './IS_PEN';
import { IS_PFL } from './IS_PFL';
import { IS_PIT } from './IS_PIT';
import { IS_PLA } from './IS_PLA';
import { IS_PLC } from './IS_PLC';
import { IS_PLH } from './IS_PLH';
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

export const packetTypeToClass = {
  [PacketType.ISP_NONE]: IS_NONE,
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
  [PacketType.ISP_PLH]: IS_PLH,
  [PacketType.ISP_IPB]: IS_IPB,
  [PacketType.ISP_AIC]: IS_AIC,
  [PacketType.ISP_AII]: IS_AII,
};
