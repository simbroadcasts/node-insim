import type { PacketTestData } from '../../utils/tests';
import { stringToBytes, testInfoPacket } from '../../utils/tests';
import { ConfirmationFlags, IS_RES, PacketType, PlayerFlags } from '..';

const size = 84;

const uName = '123456789 123456789 user';
const pName = '123456789 123456789 play';
const plate = '12345678';

const data: PacketTestData<IS_RES> = {
  ReqI: 0,
  PLID: 3,
  UName: uName,
  PName: pName,
  Plate: plate,
  CName: 'XRT_',
  TTime: 67111146,
  BTime: 16843392,
  SpA: 0,
  NumStops: 2,
  Confirm: ConfirmationFlags.CONF_PENALTY_DT | ConfirmationFlags.CONF_MENTIONED,
  SpB: 0,
  LapsDone: 68,
  Flags: PlayerFlags.PIF_AUTOGEARS | PlayerFlags.PIF_LEFTSIDE,
  ResultNum: 12,
  NumRes: 22,
  PSeconds: 6,
};

const buffer = Buffer.from([
  size / new IS_RES().SIZE_MULTIPLIER, // Size
  35, // Type
  0, // ReqI
  3, // PLID
  ...stringToBytes(uName), // UName[24]
  ...stringToBytes(pName), // PName[24]
  ...stringToBytes(plate), // Plate[8]
  ...stringToBytes('XRT_'), // CName[4]
  234, // TTime (1)
  8, // TTime (2)
  0, // TTime (3)
  4, // TTime (4)
  128, // BTime (1)
  2, // BTime (2)
  1, // BTime (3)
  1, // BTime (4)
  0, // SpA
  2, // NumStops
  5, // Confirm
  0, // SpB
  68, // LapsDone (1)
  0, // LapsDone (2)
  9, // Flags (1)
  0, // Flags (2)
  12, // ResultNum
  22, // NumRes
  6, // PSeconds (1)
  0, // PSeconds (2)
]);

describe('IS_RES', () => {
  testInfoPacket({
    packetClass: IS_RES,
    size,
    type: PacketType.ISP_RES,
    data,
    buffer,
  });
});
