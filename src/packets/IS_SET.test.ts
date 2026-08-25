import type { PacketTestData } from '../tests';
import { stringToBytes, testInfoPacket } from '../tests';
import { PacketType, TyreCompound } from './enums';
import { CarConfiguration, PassengerFlags, SetupFlags } from './IS_NPL';
import {
  CentreDifferential,
  Differential,
  IS_SET,
  TyreManufacturer,
} from './IS_SET';

const size = 136;

const data: PacketTestData<IS_SET> = {
  PLID: 7,
  CName: 'XRT',
  FuelLoad: 50,
  SetF: SetupFlags.SETF_TC_ENABLE,
  H_MBal: 50,
  TyreMfr: TyreManufacturer.MICHELIN,
  BrakePerWheel: 0,
  BWingRear: 5,
  BWingFront: 3,
  H_Mass: 10,
  H_TRes: 15,
  MaxSteer: 25,
  Parallel: 50,
  BBal: 54,
  AntiEngineBrake: 20,
  CDiffType: CentreDifferential.VISCOUS_LSD,
  CDiffDDamp: 30,
  CDiffSplit: 50,
  GRatio1: 100,
  GRatio2: 101,
  GRatio3: 102,
  GRatio4: 103,
  GRatio5: 104,
  GRatio6: 105,
  GRatio7: 106,
  GFinalRatio: 107,
  Passengers: PassengerFlags.FRONT_FEMALE,
  Config: CarConfiguration.OPEN_ROOF_OR_ALTERNATE,
  TC: 5,
  TCLow: 50,
  RRideHeight: 0,
  RSpring: 0,
  RBump: 0,
  RRebound: 0,
  RARB: 0,
  HandBrake: 0,
  RToe: 9,
  RCaster: 0,
  RTyreCompound: TyreCompound.TYRE_R2,
  RTyreWarmer: 52,
  RTyreCamberLeft: 45,
  RTyreCamberRight: 45,
  RTyreWidth: 0,
  RDiffPreload: 0,
  RDiffType: Differential.LOCKED_DIFF,
  RDiffDDamp: 10,
  RDiffLockPower: 10,
  RDiffLockCoast: 10,
  RTyrePressLeft: 200,
  RTyrePressRight: 201,
  FRideHeight: 0,
  FSpring: 0,
  FBump: 0,
  FRebound: 0,
  FARB: 0,
  FToe: 9,
  FCaster: 0,
  FTyreCompound: TyreCompound.TYRE_R3,
  FTyreWarmer: 52,
  FTyreCamberLeft: 45,
  FTyreCamberRight: 45,
  FTyreWidth: 0,
  FDiffPreload: 0,
  FDiffType: Differential.LOCKED_DIFF,
  FDiffDDamp: 10,
  FDiffLockPower: 10,
  FDiffLockCoast: 10,
  FTyrePressLeft: 202,
  FTyrePressRight: 203,
};

const buffer = new Uint8Array([
  size / new IS_SET().SIZE_MULTIPLIER, // Size
  70, // Type
  0, // ReqI
  7, // PLID
  ...stringToBytes('XRT'), // CName[4]
  0,
  0,
  0,
  0,
  0, // Spare
  50, // FuelLoad
  0, // Sp1
  0, // Sp2
  0, // Sp3
  2, // SetF
  0, // Sp4
  50, // H_MBal
  3, // TyreMfr
  0,
  0,
  0,
  0, // BrakePerWheel
  5, // BWingRear
  3, // BWingFront
  10, // H_Mass
  15, // H_TRes
  25, // MaxSteer
  50, // Parallel
  54, // BBal
  20, // AntiEngineBrake
  1, // CDiffType
  30, // CDiffDDamp
  0, // CDiffK2
  50, // CDiffSplit
  100,
  0, // GRatio1
  101,
  0, // GRatio2
  102,
  0, // GRatio3
  103,
  0, // GRatio4
  104,
  0, // GRatio5
  105,
  0, // GRatio6
  106,
  0, // GRatio7
  107,
  0, // GFinalRatio
  2, // Passengers
  1, // Config
  5, // TC
  50, // TCLow
  0,
  0,
  0,
  0, // RRideHeight
  0,
  0,
  0,
  0, // RSpring
  0,
  0,
  0,
  0, // RBump
  0,
  0,
  0,
  0, // RRebound
  0,
  0,
  0,
  0, // RARB
  0,
  0,
  0,
  0, // HandBrake
  9, // RToe
  0, // RCaster
  1, // RTyreCompound
  52, // RTyreWarmer
  45, // RTyreCamberLeft
  45, // RTyreCamberRight
  0, // RTyreWidth
  0, // RDiffPreload
  1, // RDiffType
  10, // RDiffDDamp
  10, // RDiffLockPower
  10, // RDiffLockCoast
  200,
  0, // RTyrePressLeft
  201,
  0, // RTyrePressRight
  0,
  0,
  0,
  0, // FRideHeight
  0,
  0,
  0,
  0, // FSpring
  0,
  0,
  0,
  0, // FBump
  0,
  0,
  0,
  0, // FRebound
  0,
  0,
  0,
  0, // FARB
  0,
  0,
  0,
  0, // Sp5
  9, // FToe
  0, // FCaster
  2, // FTyreCompound
  52, // FTyreWarmer
  45, // FTyreCamberLeft
  45, // FTyreCamberRight
  0, // FTyreWidth
  0, // FDiffPreload
  1, // FDiffType
  10, // FDiffDDamp
  10, // FDiffLockPower
  10, // FDiffLockCoast
  202,
  0, // FTyrePressLeft
  203,
  0, // FTyrePressRight
]);

describe('IS_SET', () => {
  testInfoPacket({
    packetClass: IS_SET,
    type: PacketType.ISP_SET,
    size,
    data,
    buffer,
  });
});
