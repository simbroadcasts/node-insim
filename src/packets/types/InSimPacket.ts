import type { IR_ARP } from '../IR_ARP';
import type { IR_ERR } from '../IR_ERR';
import type { IR_HOS } from '../IR_HOS';
import type { IS_ACR } from '../IS_ACR';
import type { IS_AXI } from '../IS_AXI';
import type { IS_AXM } from '../IS_AXM';
import type { IS_AXO } from '../IS_AXO';
import type { IS_BFN } from '../IS_BFN';
import type { IS_BTC } from '../IS_BTC';
import type { IS_BTT } from '../IS_BTT';
import type { IS_CCH } from '../IS_CCH';
import type { IS_CIM } from '../IS_CIM';
import type { IS_CNL } from '../IS_CNL';
import type { IS_CON } from '../IS_CON';
import type { IS_CPP } from '../IS_CPP';
import type { IS_CPR } from '../IS_CPR';
import type { IS_CRS } from '../IS_CRS';
import type { IS_CSC } from '../IS_CSC';
import type { IS_FIN } from '../IS_FIN';
import type { IS_FLG } from '../IS_FLG';
import type { IS_HLV } from '../IS_HLV';
import type { IS_III } from '../IS_III';
import type { IS_ISM } from '../IS_ISM';
import type { IS_JRR } from '../IS_JRR';
import type { IS_LAP } from '../IS_LAP';
import type { IS_MAL } from '../IS_MAL';
import type { IS_MCI } from '../IS_MCI';
import type { IS_MSO } from '../IS_MSO';
import type { IS_NCI } from '../IS_NCI';
import type { IS_NCN } from '../IS_NCN';
import type { IS_NLP } from '../IS_NLP';
import type { IS_NPL } from '../IS_NPL';
import type { IS_OBH } from '../IS_OBH';
import type { IS_PEN } from '../IS_PEN';
import type { IS_PFL } from '../IS_PFL';
import type { IS_PIT } from '../IS_PIT';
import type { IS_PLA } from '../IS_PLA';
import type { IS_PLL } from '../IS_PLL';
import type { IS_PLP } from '../IS_PLP';
import type { IS_PSF } from '../IS_PSF';
import type { IS_REO } from '../IS_REO';
import type { IS_RES } from '../IS_RES';
import type { IS_RIP } from '../IS_RIP';
import type { IS_RST } from '../IS_RST';
import type { IS_SLC } from '../IS_SLC';
import type { IS_SMALL } from '../IS_SMALL';
import type { IS_SPX } from '../IS_SPX';
import type { IS_SSH } from '../IS_SSH';
import type { IS_STA } from '../IS_STA';
import type { IS_TINY } from '../IS_TINY';
import type { IS_TOC } from '../IS_TOC';
import type { IS_UCO } from '../IS_UCO';
import type { IS_VER } from '../IS_VER';
import type { IS_VTN } from '../IS_VTN';

export type InSimPacket =
  | IS_VER
  | IS_TINY
  | IS_SMALL
  | IS_STA
  | IS_CPP
  | IS_ISM
  | IS_MSO
  | IS_III
  | IS_VTN
  | IS_RST
  | IS_NCN
  | IS_CNL
  | IS_CPR
  | IS_NPL
  | IS_PLP
  | IS_PLL
  | IS_LAP
  | IS_SPX
  | IS_PIT
  | IS_PSF
  | IS_PLA
  | IS_CCH
  | IS_PEN
  | IS_TOC
  | IS_FLG
  | IS_PFL
  | IS_FIN
  | IS_RES
  | IS_REO
  | IS_NLP
  | IS_MCI
  | IS_CRS
  | IS_BFN
  | IS_AXI
  | IS_AXO
  | IS_BTC
  | IS_BTT
  | IS_RIP
  | IS_SSH
  | IS_CON
  | IS_OBH
  | IS_HLV
  | IS_AXM
  | IS_ACR
  | IS_NCI
  | IS_JRR
  | IS_UCO
  | IS_SLC
  | IS_CSC
  | IS_CIM
  | IS_MAL
  | IR_HOS
  | IR_ERR
  | IR_ARP;
