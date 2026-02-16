import { PacketType } from './enums/PacketType.js';
import { IS_ACR } from './packets/IS_ACR.js';
import { IS_AIC } from './packets/IS_AIC.js';
import { IS_AII } from './packets/IS_AII.js';
import { IS_AXI } from './packets/IS_AXI.js';
import { IS_AXM } from './packets/IS_AXM.js';
import { IS_AXO } from './packets/IS_AXO.js';
import { IS_BFN } from './packets/IS_BFN.js';
import { IS_BTC } from './packets/IS_BTC.js';
import { IS_BTN } from './packets/IS_BTN.js';
import { IS_BTT } from './packets/IS_BTT.js';
import { IS_CCH } from './packets/IS_CCH.js';
import { IS_CIM } from './packets/IS_CIM.js';
import { IS_CNL } from './packets/IS_CNL.js';
import { IS_CON } from './packets/IS_CON.js';
import { IS_CPP } from './packets/IS_CPP.js';
import { IS_CPR } from './packets/IS_CPR.js';
import { IS_CRS } from './packets/IS_CRS.js';
import { IS_CSC } from './packets/IS_CSC.js';
import { IS_FIN } from './packets/IS_FIN.js';
import { IS_FLG } from './packets/IS_FLG.js';
import { IS_HCP } from './packets/IS_HCP.js';
import { IS_HLV } from './packets/IS_HLV.js';
import { IS_III } from './packets/IS_III.js';
import { IS_IPB } from './packets/IS_IPB.js';
import { IS_ISI } from './packets/IS_ISI.js';
import { IS_ISM } from './packets/IS_ISM.js';
import { IS_JRR } from './packets/IS_JRR.js';
import { IS_LAP } from './packets/IS_LAP.js';
import { IS_MAL } from './packets/IS_MAL.js';
import { IS_MCI } from './packets/IS_MCI.js';
import { IS_MOD } from './packets/IS_MOD.js';
import { IS_MSL } from './packets/IS_MSL.js';
import { IS_MSO } from './packets/IS_MSO.js';
import { IS_MST } from './packets/IS_MST.js';
import { IS_MSX } from './packets/IS_MSX.js';
import { IS_MTC } from './packets/IS_MTC.js';
import { IS_NCI } from './packets/IS_NCI.js';
import { IS_NCN } from './packets/IS_NCN.js';
import { IS_NLP } from './packets/IS_NLP.js';
import { IS_NONE } from './packets/IS_NONE.js';
import { IS_NPL } from './packets/IS_NPL.js';
import { IS_OBH } from './packets/IS_OBH.js';
import { IS_OCO } from './packets/IS_OCO.js';
import { IS_PEN } from './packets/IS_PEN.js';
import { IS_PFL } from './packets/IS_PFL.js';
import { IS_PIT } from './packets/IS_PIT.js';
import { IS_PLA } from './packets/IS_PLA.js';
import { IS_PLC } from './packets/IS_PLC.js';
import { IS_PLH } from './packets/IS_PLH.js';
import { IS_PLL } from './packets/IS_PLL.js';
import { IS_PLP } from './packets/IS_PLP.js';
import { IS_PSF } from './packets/IS_PSF.js';
import { IS_REO } from './packets/IS_REO.js';
import { IS_RES } from './packets/IS_RES.js';
import { IS_RIP } from './packets/IS_RIP.js';
import { IS_RST } from './packets/IS_RST.js';
import { IS_SCC } from './packets/IS_SCC.js';
import { IS_SCH } from './packets/IS_SCH.js';
import { IS_SFP } from './packets/IS_SFP.js';
import { IS_SLC } from './packets/IS_SLC.js';
import { IS_SMALL } from './packets/IS_SMALL.js';
import { IS_SPX } from './packets/IS_SPX.js';
import { IS_SSH } from './packets/IS_SSH.js';
import { IS_STA } from './packets/IS_STA.js';
import { IS_TINY } from './packets/IS_TINY.js';
import { IS_TOC } from './packets/IS_TOC.js';
import { IS_TTC } from './packets/IS_TTC.js';
import { IS_UCO } from './packets/IS_UCO.js';
import { IS_VER } from './packets/IS_VER.js';
import { IS_VTN } from './packets/IS_VTN.js';

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
