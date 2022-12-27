import type { PacketTestData } from '../../utils';
import { testInfoPacket } from '../../utils';
import { IS_PFL, PacketType, PlayerFlags } from '..';
import { AbstractPacket } from '../AbstractPacket';

const size = 8;

const data: PacketTestData<IS_PFL> = {
  ReqI: 0,
  PLID: 3,
  Flags: PlayerFlags.PIF_AUTOGEARS | PlayerFlags.PIF_LEFTSIDE,
  Spare: 0,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  33, // Type
  0, // ReqI
  3, // PLID
  9, // Flags (1)
  0, // Flags (2)
  0, // Spare (1)
  0, // Spare (2)
]);

describe('IS_PFL', () => {
  testInfoPacket({
    packetClass: IS_PFL,
    size,
    type: PacketType.ISP_PFL,
    data,
    buffer,
  });
});
