import { testSendablePacket } from '../../utils';
import type { IS_CPP_Data } from '..';
import { IS_CPP, PacketType, StateFlags, ViewIdentifier } from '..';
import { BasePacket } from '../BasePacket';

const data: IS_CPP_Data = {
  X: 1,
  Y: 2147483647,
  Z: -2147483648,
  H: 65535,
  P: 456,
  R: 39,
  ViewPLID: 32,
  InGameCam: ViewIdentifier.VIEW_CUSTOM,
  FOV: 40,
  Time: 200,
  Flags: StateFlags.ISS_VIEW_OVERRIDE,
};

const buffer = Buffer.from([
  32 / BasePacket.SIZE_MULTIPLIER, // Size
  9, // Type
  0, // ReqI
  0, // Zero
  1, // X (1)
  0, // X (2)
  0, // X (3)
  0, // X (4)
  255, // Y (1)
  255, // Y (2)
  255, // Y (3)
  127, // Y (4)
  0, // Z (1)
  0, // Z (2)
  0, // Z (3)
  128, // Z (4)
  255, // H (1)
  255, // H (2)
  200, // P (1)
  1, // P (2)
  39, // R (1)
  0, // R (0)
  32, // ViewPLID
  4, // InGameCam
  0, // FOV (1)
  0, // FOV (2)
  32, // FOV (3)
  66, // FOV (4)
  200, // Time (1)
  0, // Time (2)
  0, // Flags (1)
  32, // Flags (2)
]);

describe('IS_CPP', () => {
  testSendablePacket(IS_CPP, 32, PacketType.ISP_CPP, data, buffer);

  it('should unpack data from a buffer', () => {
    const packet = new IS_CPP().unpack(buffer);

    expect(packet.Size).toEqual(32);
    expect(packet.Type).toEqual(PacketType.ISP_CPP);
    expect(packet.ReqI).toEqual(0);
    expect(packet.Zero).toEqual(0);
    expect(packet.X).toEqual(1);
    expect(packet.Y).toEqual(2147483647);
    expect(packet.Z).toEqual(-2147483648);
    expect(packet.H).toEqual(65535);
    expect(packet.P).toEqual(456);
    expect(packet.R).toEqual(39);
    expect(packet.ViewPLID).toEqual(32);
    expect(packet.InGameCam).toEqual(ViewIdentifier.VIEW_CUSTOM);
    expect(packet.FOV).toEqual(40);
    expect(packet.Time).toEqual(200);
    expect(packet.Flags).toEqual(StateFlags.ISS_VIEW_OVERRIDE);
  });
});
