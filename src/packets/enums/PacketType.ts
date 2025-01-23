export enum PacketType {
  /** Not used */
  ISP_NONE,

  /** Instruction: insim initialise */
  ISP_ISI,

  /** Info: version info */
  ISP_VER,

  /** Both ways: multi purpose */
  ISP_TINY,

  /** Both ways: multi purpose */
  ISP_SMALL,

  /** Info: state info */
  ISP_STA,

  /** Instruction: single character */
  ISP_SCH,

  /** Instruction: state flags pack */
  ISP_SFP,

  /** Instruction: set car camera */
  ISP_SCC,

  /** Both ways: cam pos pack */
  ISP_CPP,

  /** Info: start multiplayer */
  ISP_ISM,

  /** Info: message out */
  ISP_MSO,

  /** Info: hidden /i message */
  ISP_III,

  /** Instruction: type message or /command */
  ISP_MST,

  /** Instruction: message to a connection */
  ISP_MTC,

  /** Instruction: set screen mode */
  ISP_MOD,

  /** Info: vote notification */
  ISP_VTN,

  /** Info: race start */
  ISP_RST,

  /** Info: new connection */
  ISP_NCN,

  /** Info: connection left */
  ISP_CNL,

  /** Info: connection renamed */
  ISP_CPR,

  /** Info: new player (joined race) */
  ISP_NPL,

  /** Info: player pit (keeps slot in race) */
  ISP_PLP,

  /** Info: player leave (spectate - loses slot) */
  ISP_PLL,

  /** Info: lap time */
  ISP_LAP,

  /** Info: split x time */
  ISP_SPX,

  /** Info: pit stop start */
  ISP_PIT,

  /** Info: pit stop finish */
  ISP_PSF,

  /** Info: pit lane enter / leave */
  ISP_PLA,

  /** Info: camera changed */
  ISP_CCH,

  /** Info: penalty given or cleared */
  ISP_PEN,

  /** Info: take over car */
  ISP_TOC,

  /** Info: flag (yellow or blue) */
  ISP_FLG,

  /** Info: player flags (help flags) */
  ISP_PFL,

  /** Info: finished race */
  ISP_FIN,

  /** Info: result confirmed */
  ISP_RES,

  /** Both ways: reorder (info or instruction) */
  ISP_REO,

  /** Info: node and lap packet */
  ISP_NLP,

  /** Info: multi car info */
  ISP_MCI,

  /** Instruction: type message */
  ISP_MSX,

  /** Instruction: message to local computer */
  ISP_MSL,

  /** Info: car reset */
  ISP_CRS,

  /** Both ways: delete buttons / receive button requests */
  ISP_BFN,

  /** Info: autocross layout information */
  ISP_AXI,

  /** Info: hit an autocross object */
  ISP_AXO,

  /** Instruction: show a button on local or remote screen */
  ISP_BTN,

  /** Info: sent when a user clicks a button */
  ISP_BTC,

  /** Info: sent after typing into a button */
  ISP_BTT,

  /** Both ways: replay information packet */
  ISP_RIP,

  /** Both ways: screenshot */
  ISP_SSH,

  /** Info: contact between cars (collision report) */
  ISP_CON,

  /** Info: contact car + object (collision report) */
  ISP_OBH,

  /** Info: report incidents that would violate HLVC */
  ISP_HLV,

  /** Instruction: player cars */
  ISP_PLC,

  /** Both ways: autocross multiple objects */
  ISP_AXM,

  /** Info: admin command report */
  ISP_ACR,

  /** Instruction: car handicaps */
  ISP_HCP,

  /** Info: new connection - extra info for host */
  ISP_NCI,

  /** Instruction: reply to a join request (allow / disallow) */
  ISP_JRR,

  /** Info: report InSim checkpoint / InSim circle */
  ISP_UCO,

  /** Instruction: object control (currently used for lights) */
  ISP_OCO,

  /** Instruction: multi purpose - target to connection */
  ISP_TTC,

  /** Info: connection selected a car */
  ISP_SLC,

  /** Info: car state changed */
  ISP_CSC,

  /** Info: connection's interface mode */
  ISP_CIM,

  /** Both ways: set mods allowed */
  ISP_MAL,

  /** Both ways: set player handicaps */
  ISP_PLH,

  /** Both ways: set IP bans */
  ISP_IPB,

  /** Instruction: Set AI control value */
  ISP_AIC,

  /** Info: Info about AI car */
  ISP_AII,

  /** Instruction: request if we are host admin (after connecting to a host) */
  IRP_ARQ = 250,

  /** Info: replies if you are admin (after connecting to a host) */
  IRP_ARP = 251,

  /** Instruction: Request a host list */
  IRP_HLR = 252,

  /** Info: Host list info */
  IRP_HOS = 253,

  /** Instruction: Select a host */
  IRP_SEL = 254,

  /** Info: An error number */
  IRP_ERR = 255,
}
