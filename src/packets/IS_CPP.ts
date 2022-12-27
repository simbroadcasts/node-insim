import { byte, float, int, word } from '../utils';
import { BaseSendablePacket } from './BaseSendablePacket';
import type { StateFlags, ViewIdentifier } from './enums';
import { PacketType } from './enums';
import type { PacketData } from './types';

/**
 * Cam Pos Pack - Full camera packet (in car OR SHIFT+U mode)
 *
 * A Camera Position Packet can be used for LFS to report a camera position and state.
 * An InSim program can also send one to set LFS camera position in game or SHIFT+U mode.
 */
export class IS_CPP extends BaseSendablePacket {
  @byte() readonly Size = 32;
  @byte() readonly Type = PacketType.ISP_CPP;

  /** Instruction: 0 / or reply: ReqI as received in the {@link TINY_SCP} */
  @byte() ReqI = 0;

  @byte() readonly Zero: 0 = 0;

  /** Position vector X coordinate - 65536 means 1 metre */
  @int() X = 0;

  /** Position vector Y coordinate - 65536 means 1 metre */
  @int() Y = 0;

  /** Position vector Z coordinate - 65536 means 1 metre */
  @int() Z = 0;

  /** Heading - 0 points along Y axis */
  @word() H = 0;

  /** Pitch */
  @word() P = 0;

  /** Roll */
  @word() R = 0;

  /**
   * Unique ID of viewed player (0 = none).
   *
   * Set this to 255 to leave that option unchanged.
   */
  @byte() ViewPLID = 0;

  /**
   * InGameCam (as reported in StatePack).
   *
   * Set this to 255 to leave that option unchanged.
   */
  @byte() InGameCam: ViewIdentifier = 0;

  /** FOV in degrees */
  @float() FOV = 0;

  /** Time in ms to get there (0 means instant) */
  @word() Time = 0;

  /** ISS state flags */
  @word() Flags: AllowedStateFlags = 0;

  constructor(data?: IS_CPP_Data) {
    super();
    this.initialize(data);
  }
}

export type IS_CPP_Data = PacketData<IS_CPP>;

export type AllowedStateFlags =
  | StateFlags.ISS_SHIFTU
  | StateFlags.ISS_SHIFTU_FOLLOW
  | StateFlags.ISS_VIEW_OVERRIDE;
