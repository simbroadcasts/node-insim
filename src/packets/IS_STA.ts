import { BasePacket } from './BasePacket';
import { byte, char, float, word } from './decorators';
import { PacketType } from './packetTypes';

/**
 * STAte
 *
 * LFS will send an {@link IS_STA} any time the info in it changes.
 *
 * To request an IS_STA at any time, send an {@link IS_TINY}
 * with {@link IS_TINY.SubT} of {@link TinyType.TINY_SST}.
 */
export class IS_STA extends BasePacket {
  @byte() readonly Size = 28;
  @byte() readonly Type = PacketType.ISP_STA;

  /** ReqI if replying to a request packet */
  @byte() ReqI = 0;

  @byte() readonly Zero: 0 = 0;

  /** 4-byte float - 1.0 is normal speed */
  @float() ReplaySpeed = 0;

  /** ISS state flags */
  @word() Flags: StateFlags = 0;

  /** Which type of camera is selected (which is still selected
   * even if LFS is actually in SHIFT+U mode) */
  @byte() InGameCam: ViewIdentifier = 0;

  /** Unique ID of viewed player (0 = none) */
  @byte() ViewPLID = 0;

  /** Number of players in race */
  @byte() NumP = 0;

  /** Number of connections including host */
  @byte() NumConns = 0;

  /** Number finished or qualified */
  @byte() NumFinished = 0;

  /** 0 = no race / 1 = race / 2 = qualifying */
  @byte() RaceInProg: RaceState = 0;

  /** Qualifying length in minutes */
  @byte() QualMins = 0;

  /**
   * RaceLaps (rl): (various meanings depending on range)
   *
   * 0       : practice
   * 1-99    : number of laps...   laps  = rl
   * 100-190 : 100 to 1000 laps... laps  = (rl - 100) * 10 + 100
   * 191-238 : 1 to 48 hours...    hours = rl - 190
   */
  @byte() RaceLaps = 0;

  @byte() Sp2: 0 = 0;

  /** 0 = unknown / 1 = success / > 1 = fail */
  @byte() ServerStatus: ServerStatus | number = 0;

  /** Short name for track e.g. FE2R */
  @char(6) Track = '';

  @byte() Weather = 0;

  /** 0 = off / 1 = weak / 2 = strong */
  @byte() Wind: Wind = 0;

  constructor(data?: Buffer) {
    super();
    this.initialize(data);
  }
}

export enum StateFlags {
  /** In game (or MPR) */
  ISS_GAME = 1,

  /** In SPR */
  ISS_REPLAY = 2,

  /** Paused */
  ISS_PAUSED = 4,

  /** SHIFT+U mode */
  ISS_SHIFTU = 8,

  /** In a dialog */
  ISS_DIALOG = 16,

  /** FOLLOW view */
  ISS_SHIFTU_FOLLOW = 32,

  /** SHIFT+U buttons hidden */
  ISS_SHIFTU_NO_OPT = 64,

  /** Showing 2d display */
  ISS_SHOW_2D = 128,

  /** Entry screen */
  ISS_FRONT_END = 256,

  /** Multiplayer mode */
  ISS_MULTI = 512,

  /** Multiplayer speedup option */
  ISS_MPSPEEDUP = 1024,

  /** LFS is running in a window */
  ISS_WINDOWED = 2048,

  /** Sound is switched off */
  ISS_SOUND_MUTE = 4096,

  /** Override user view */
  ISS_VIEW_OVERRIDE = 8192,

  /** InSim buttons visible */
  ISS_VISIBLE = 16384,

  /** In a text entry dialog */
  ISS_TEXT_ENTRY = 32768,
}

export enum ViewIdentifier {
  /** Arcade */
  VIEW_FOLLOW,

  /** Helicopter */
  VIEW_HELI,

  /** TV camer */
  VIEW_CAM,

  /** Cockpit */
  VIEW_DRIVER,

  /** Custom */
  VIEW_CUSTOM,

  VIEW_MAX,
}

export enum RaceState {
  NoRace,
  Race,
  Qualifying,
}

export enum ServerStatus {
  Unknown,
  Success,
}

export enum Wind {
  Off,
  Weak,
  Strong,
}
