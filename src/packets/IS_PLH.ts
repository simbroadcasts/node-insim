import { byte } from '../decorators';
import { copyBuffer } from '../lfspack';
import { SendablePacket } from './base';
import { PacketType } from './enums';
import { PlayerHCap } from './structs';
import type { PacketData } from './types';

/**
 * PLayer Handicaps - variable size
 *
 * These handicaps will remain until the player spectates or rejoins after returning from pits or garage (an {@link IS_NPL} will be sent in that case).
 *
 * An output IS_PLH is sent to all InSim clients after an IS_PLH is received. The output IS_PLH contains an entry for all valid players that had handicaps updated. An IS_PLH is also output when a handicap is set by a text command /h_mass username X or /h_tres username X
 */
export class IS_PLH extends SendablePacket {
  public static readonly PLH_MAX_PLAYERS = 40; // NOTE: Increase if MAX_CARS_S2 is increased

  /** 4 + NumP * 4 */
  @byte() Size = 4;
  @byte() readonly Type = PacketType.ISP_PLH;

  /** 0 unless this is a reply to a {@link TINY_PLH} request */
  @byte() ReqI = 0;

  /** Number of players in this packet */
  @byte() NumP = 0;

  /** 0 to {@link IS_PLH.PLH_MAX_PLAYERS} ({@link NumP}) */
  HCaps: PlayerHCap[] = [];

  private readonly handicapsOffset = 4;

  constructor(data?: IS_PLH_Data) {
    super();
    this.initialize(data);
  }

  unpack(buffer: Uint8Array): this {
    super.unpack(buffer);

    const playerHandicapLength = new PlayerHCap().getFormatSize();

    for (let i = 0; i < this.NumP; i++) {
      const start = this.handicapsOffset + playerHandicapLength * i;
      const objectInfoBuffer = copyBuffer(
        buffer.slice(start, start + playerHandicapLength),
      );
      this.HCaps.push(new PlayerHCap().unpack(objectInfoBuffer));
    }

    return this;
  }
  pack() {
    if (this.HCaps.length > IS_PLH.PLH_MAX_PLAYERS) {
      throw new RangeError(
        `IS_PLH - Too many players set (max is ${IS_PLH.PLH_MAX_PLAYERS}`,
      );
    }

    const playerHandicapLength = new PlayerHCap().getFormatSize();
    this.Size = this.handicapsOffset + this.HCaps.length * playerHandicapLength;

    const dataBuffer = super.pack();
    const handicapBuffer = this.HCaps.reduce(
      (acc, handicap) => new Uint8Array([...acc, ...handicap.pack()]),
      new Uint8Array(),
    );

    return new Uint8Array([...dataBuffer, ...handicapBuffer]);
  }
}

export type IS_PLH_Data = PacketData<IS_PLH>;
