import { stringToBytes } from '../../utils';
import {
  IS_NPL,
  PacketType,
  PassengerFlags,
  PlayerFlags,
  PlayerType,
  SetupFlags,
  TyreCompound,
} from '..';
import { BasePacket } from '../BasePacket';

describe('IS_NPL', () => {
  it('should unpack data from a buffer', () => {
    const buffer = Buffer.from([
      76 / BasePacket.SIZE_MULTIPLIER, // Size
      PacketType.ISP_NPL, // Type
      0, // ReqI
      3, // PLID
      5, // UCID
      PlayerType.AI, // PType
      PlayerFlags.PIF_AUTOGEARS, // Flags (0)
      0, // PlayerFlags (1)
      ...stringToBytes("Player's name max length"), // PName[24]
      ...stringToBytes('MAX_CAR_TEX_NAME'), // SName[16]
      TyreCompound.TYRE_R1, // TyreRL
      TyreCompound.TYRE_R2, // TyreRR
      TyreCompound.TYRE_R3, // TyreFL
      TyreCompound.TYRE_R4, // TyreFR
      10, // H_Mass
      15, // H_TRes
      1, // Model
      PassengerFlags.FRONT_FEMALE, // Pass
      4, // RWAdj
      5, // FWAdj
      0, // Sp2
      0, // Sp3
      SetupFlags.SETF_ABS_ENABLE, // SetF
      20, // NumP
      1, // Config
      34, // Fuel
    ]);
    const packet = new IS_NPL().unpack(buffer);

    expect(packet.Size).toEqual(76);
    expect(packet.Type).toEqual(PacketType.ISP_NPL);
    expect(packet.ReqI).toEqual(0);
    expect(packet.PLID).toEqual(3);
    expect(packet.UCID).toEqual(5);
    expect(packet.PType).toEqual(PlayerType.AI);
    expect(packet.Flags).toEqual(PlayerFlags.PIF_AUTOGEARS);
    expect(packet.PName).toEqual("Player's name max length");
    expect(packet.SName).toEqual('MAX_CAR_TEX_NAME');
    expect(packet.TyreRL).toEqual(TyreCompound.TYRE_R1);
    expect(packet.TyreRR).toEqual(TyreCompound.TYRE_R2);
    expect(packet.TyreFL).toEqual(TyreCompound.TYRE_R3);
    expect(packet.H_Mass).toEqual(10);
    expect(packet.H_TRes).toEqual(15);
    expect(packet.Model).toEqual(1);
    expect(packet.Pass).toEqual(PassengerFlags.FRONT_FEMALE);
    expect(packet.RWAdj).toEqual(4);
    expect(packet.FWAdj).toEqual(5);
    expect(packet.Sp2).toEqual(0);
    expect(packet.Sp3).toEqual(0);
    expect(packet.SetF).toEqual(SetupFlags.SETF_ABS_ENABLE);
    expect(packet.NumP).toEqual(20);
    expect(packet.Config).toEqual(1);
    expect(packet.Fuel).toEqual(34);
  });
});
