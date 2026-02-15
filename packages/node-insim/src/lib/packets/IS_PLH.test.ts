import { testInfoPacket, testInstructionPacket } from '../tests';
import { PacketType } from './enums';
import type { IS_PLH_Data } from './IS_PLH';
import { IS_PLH } from './IS_PLH';
import { PlayerHCap, PlayerHCapFlags } from './structs';

const size = 16;

const data: IS_PLH_Data = {
  NumP: 3,
  HCaps: [
    new PlayerHCap({
      PLID: 1,
      Flags: PlayerHCapFlags.MASS,
      H_Mass: 200,
    }),
    new PlayerHCap({
      PLID: 2,
      Flags: PlayerHCapFlags.INTAKE_RESTRICTION,
      H_TRes: 40,
    }),
    new PlayerHCap({
      PLID: 3,
      Flags: PlayerHCapFlags.MASS | PlayerHCapFlags.INTAKE_RESTRICTION,
      H_Mass: 200,
      H_TRes: 40,
    }),
  ],
};

const buffer = new Uint8Array([
  size / new IS_PLH().SIZE_MULTIPLIER, // Size
  66, // Type
  0, // ReqI
  3, // NumP
  1, // HCaps[1] - PLID
  1, // HCaps[1] - Flags
  200, // HCaps[1] - H_Mass
  0, // HCaps[1] - H_TRes
  2, // HCaps[2] - PLID
  2, // HCaps[2] - Flags
  0, // HCaps[2] - H_Mass
  40, // HCaps[2] - H_TRes
  3, // HCaps[3] - PLID
  3, // HCaps[3] - Flags
  200, // HCaps[3] - H_Mass
  40, // HCaps[3] - H_TRes
]);

describe('IS_PLH', () => {
  testInstructionPacket({
    packetClass: IS_PLH,
    size: 4, // This is the default size in IS_PLH excluding the dynamic size
    type: PacketType.ISP_PLH,
    data,
    buffer,
  });
  testInfoPacket({
    packetClass: IS_PLH,
    size,
    type: PacketType.ISP_PLH,
    data,
    buffer,
  });

  it('should throw a range error if HCaps length is greater than 48', () => {
    expect(() => {
      new IS_PLH({
        NumP: 49,
        HCaps: [
          ...new Array(49).fill(undefined).map(
            (_, index) =>
              new PlayerHCap({
                PLID: index,
                Flags: PlayerHCapFlags.INTAKE_RESTRICTION,
                H_TRes: 50,
              }),
          ),
        ],
      }).pack();
    }).toThrow(RangeError);
  });
});
