import type { PacketTestData } from '../../utils';
import { testInfoPacket } from '../../utils';
import { IS_PIT, PacketType, PlayerFlags } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 24;

const data: PacketTestData<IS_PIT> = {
  ReqI: 0,
  PLID: 1,
  LapsDone: 25,
  Flags:
    PlayerFlags.PIF_LEFTSIDE |
    PlayerFlags.PIF_AUTOGEARS |
    PlayerFlags.PIF_AUTOCLUTCH |
    PlayerFlags.PIF_HELP_B |
    PlayerFlags.PIF_MOUSE,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  26, // Type
  0, // ReqI
  1, // PLID
  25, // LapsDone (1)
  0, // LapsDone (2)
  73, // Flags (1)
  6, // Flags (2)
  30, // FuelAdd
  0, // Penalty
  1, // NumStops
  0, // Sp3
  255, // TyreRL
  255, // TyreRR
  255, // TyreFL
  255, // TyreFL
  2, // Work (1)
  0, // Work (2)
  2, // Work (3)
  0, // Work (4)
  0, // Spare (1)
  0, // Spare (2)
  0, // Spare (3)
  0, // Spare (4)
]);

describe('IS_PIT', () => {
  testInfoPacket({
    packetClass: IS_PIT,
    size,
    type: PacketType.ISP_PIT,
    data,
    buffer,
  });
});
