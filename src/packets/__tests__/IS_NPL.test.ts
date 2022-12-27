import type { PacketTestData } from '../../utils/tests';
import { stringToBytes, testInfoPacket } from '../../utils/tests';
import {
  CarConfiguration,
  IS_NPL,
  PacketType,
  PassengerFlags,
  PlayerFlags,
  PlayerType,
  SetupFlags,
  TyreCompound,
} from '..';
import { AbstractPacket } from '../base';

const size = 76;

const pName = "Player's name max length";
const sName = 'MAX_CAR_TEX_NAME';

const data: PacketTestData<IS_NPL> = {
  ReqI: 0,
  PLID: 3,
  UCID: 5,
  PType: PlayerType.AI,
  Flags: PlayerFlags.PIF_AUTOGEARS,
  PName: pName,
  SName: sName,
  TyreRL: TyreCompound.TYRE_R1,
  TyreRR: TyreCompound.TYRE_R2,
  TyreFL: TyreCompound.TYRE_R3,
  TyreFR: TyreCompound.TYRE_R4,
  H_Mass: 10,
  H_TRes: 15,
  Model: 1,
  Pass: PassengerFlags.FRONT_FEMALE,
  RWAdj: 4,
  FWAdj: 5,
  Sp2: 0,
  Sp3: 0,
  SetF: SetupFlags.SETF_ABS_ENABLE,
  NumP: 20,
  Config: CarConfiguration.OPEN_ROOF_OR_ALTERNATE,
  Fuel: 34,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
  21, // Type
  0, // ReqI
  3, // PLID
  5, // UCID
  2, // PType
  8, // Flags (0)
  0, // PlayerFlags (1)
  ...stringToBytes(pName), // PName[24]
  ...stringToBytes(sName), // SName[16]
  0, // TyreRL
  1, // TyreRR
  2, // TyreFL
  3, // TyreFR
  10, // H_Mass
  15, // H_TRes
  1, // Model
  2, // Pass
  4, // RWAdj
  5, // FWAdj
  0, // Sp2
  0, // Sp3
  4, // SetF
  20, // NumP
  1, // Config
  34, // Fuel
]);

describe('IS_NPL', () => {
  testInfoPacket({
    packetClass: IS_NPL,
    size,
    type: PacketType.ISP_NPL,
    data,
    buffer,
  });
});
