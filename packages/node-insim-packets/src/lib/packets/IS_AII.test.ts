import { PacketType } from '../enums/index.js';
import { DashLights, OutSimMain } from '../out';
import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import { AICGear } from './IS_AIC.js';
import { AIFlags, IS_AII } from './IS_AII.js';

const size = 96;

const OSData = new OutSimMain();

OSData.AngVel = [176, -3584, -41984];
OSData.Heading = -41984;
OSData.Pitch = 1.1249197184092054e-25;
OSData.Roll = 1.9634917849129593e-30;
OSData.Accel = [
  2.7020799338424215e-24, 5.09854560778527e-22, 1.742994910840631e-27,
];
OSData.Vel = [2.292814997435975e-18, 5.008781102822536e-16, 3840191194202112];
OSData.Pos = [743709227, 639375641, 1160910903];

const data: PacketTestData<IS_AII> = {
  ReqI: 1,
  PLID: 5,
  OSData,
  Flags: AIFlags.AIFLAGS_CHDN | AIFlags.AIFLAGS_IGNITION,
  Gear: AICGear.FIRST,
  RPM: 3.516418933868408,
  ShowLights:
    DashLights.DL_FULLBEAM | DashLights.DL_HANDBRAKE | DashLights.DL_FOG_FRONT,
};

const buffer = new Uint8Array([
  size / new IS_AII().SIZE_MULTIPLIER, // Size
  69, // Type
  1, // ReqI
  5, // PLID
  0, // OSData - AngVel[0] (1)
  0, // OSData - AngVel[0] (2)
  48, // OSData - AngVel[0] (3)
  67, // OSData - AngVel[0] (4)
  0, // OSData - AngVel[1] (1)
  0, // OSData - AngVel[1] (2)
  96, // OSData - AngVel[1] (3)
  197, // OSData - AngVel[1] (4)
  0, // OSData - AngVel[2] (1)
  0, // OSData - AngVel[2] (2)
  36, // OSData - AngVel[2] (3)
  199, // OSData - AngVel[2] (4)
  0, // OSData - Heading (1)
  0, // OSData - Heading (2)
  36, // OSData - Heading (3)
  199, // OSData - Heading (4)
  33, // OSData - Pitch (1)
  66, // OSData - Pitch (2)
  11, // OSData - Pitch (3)
  22, // OSData - Pitch (4)
  33, // OSData - Roll (1)
  76, // OSData - Roll (2)
  31, // OSData - Roll (3)
  14, // OSData - Roll (4)
  53, // OSData - Accel[0] (1)
  16, // OSData - Accel[0] (2)
  81, // OSData - Accel[0] (3)
  24, // OSData - Accel[0] (4)
  22, // OSData - Accel[1] (1)
  24, // OSData - Accel[1] (2)
  26, // OSData - Accel[1] (3)
  28, // OSData - Accel[1] (4)
  35, // OSData - Accel[2] (1)
  24, // OSData - Accel[2] (2)
  10, // OSData - Accel[2] (3)
  19, // OSData - Accel[2] (4)
  13, // OSData - Vel[0] (1)
  46, // OSData - Vel[0] (2)
  41, // OSData - Vel[0] (3)
  34, // OSData - Vel[0] (4)
  72, // OSData - Vel[1] (1)
  94, // OSData - Vel[1] (2)
  16, // OSData - Vel[1] (3)
  38, // OSData - Vel[1] (4)
  35, // OSData - Vel[2] (1)
  74, // OSData - Vel[2] (2)
  90, // OSData - Vel[2] (3)
  89, // OSData - Vel[2] (4)
  43, // OSData - Pos[0] (1)
  26, // OSData - Pos[0] (2)
  84, // OSData - Pos[0] (3)
  44, // OSData - Pos[0] (4)
  25, // OSData - Pos[1] (1)
  25, // OSData - Pos[1] (2)
  28, // OSData - Pos[1] (3)
  38, // OSData - Pos[1] (4)
  55, // OSData - Pos[2] (1)
  24, // OSData - Pos[2] (2)
  50, // OSData - Pos[2] (3)
  69, // OSData - Pos[2] (4)
  9, // Flags
  2, // Gear
  0, // Sp2
  0, // Sp3
  2, // RPM (1)
  13, // RPM (2)
  97, // RPM (3)
  64, // RPM (4)
  0, // SpF0 (1)
  0, // SpF0 (2)
  0, // SpF0 (3)
  0, // SpF0 (4)
  0, // SpF1 (1)
  0, // SpF1 (2)
  0, // SpF1 (3)
  0, // SpF1 (4)
  6, // ShowLights (1)
  32, // ShowLights (2)
  0, // ShowLights (3)
  0, // ShowLights (4)
  0, // SPU1 (1)
  0, // SPU1 (2)
  0, // SPU1 (3)
  0, // SPU1 (4)
  0, // SPU2 (1)
  0, // SPU2 (2)
  0, // SPU2 (3)
  0, // SPU2 (4)
  0, // SPU3 (1)
  0, // SPU3 (2)
  0, // SPU3 (3)
  0, // SPU3 (4)
]);

describe('IS_AII', () => {
  testInfoPacket({
    packetClass: IS_AII,
    type: PacketType.ISP_AII,
    size,
    data,
    buffer,
  });
});
