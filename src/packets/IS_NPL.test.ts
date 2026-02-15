import type { PacketTestData } from '../tests';
import { stringToBytes, testInfoPacket } from '../tests';
import { PacketType, PlayerFlags, TyreCompound } from './enums';
import {
  CarConfiguration,
  IS_NPL,
  PassengerFlags,
  PlayerType,
  SetupFlags,
} from './IS_NPL';

const size = 76;

const pName = "Player's name max length";
const plate = 'Numplate';
const sName = 'MAX_CAR_TEX_NAME';

describe('IS_NPL', () => {
  describe('official car', () => {
    const data: PacketTestData<IS_NPL> = {
      ReqI: 0,
      PLID: 3,
      UCID: 5,
      PType: PlayerType.AI,
      Flags: PlayerFlags.PIF_AUTOGEARS,
      PName: pName,
      Plate: plate,
      CName: 'XRT',
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
      SetF: SetupFlags.SETF_ABS_ENABLE,
      NumP: 20,
      Config: CarConfiguration.OPEN_ROOF_OR_ALTERNATE,
      Fuel: 34,
    };

    const buffer = new Uint8Array([
      size / new IS_NPL().SIZE_MULTIPLIER, // Size
      21, // Type
      0, // ReqI
      3, // PLID
      5, // UCID
      2, // PType
      8, // Flags (0)
      0, // Flags (1)
      ...stringToBytes(pName), // PName[24]
      ...stringToBytes(plate), // Plate[8]
      ...stringToBytes('XRT'), // CName[4]
      0,
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

    testInfoPacket({
      packetClass: IS_NPL,
      size,
      type: PacketType.ISP_NPL,
      data,
      buffer,
    });
  });

  describe('car mod', () => {
    const data: PacketTestData<IS_NPL> = {
      ReqI: 0,
      PLID: 3,
      UCID: 5,
      PType: PlayerType.AI,
      Flags: PlayerFlags.PIF_AUTOGEARS,
      PName: pName,
      Plate: plate,
      CName: '5882E6',
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
      SetF: SetupFlags.SETF_ABS_ENABLE,
      NumP: 20,
      Config: CarConfiguration.OPEN_ROOF_OR_ALTERNATE,
      Fuel: 34,
    };

    const buffer = new Uint8Array([
      size / new IS_NPL().SIZE_MULTIPLIER, // Size
      21, // Type
      0, // ReqI
      3, // PLID
      5, // UCID
      2, // PType
      8, // Flags (0)
      0, // Flags (1)
      ...stringToBytes(pName), // PName[24]
      ...stringToBytes(plate), // Plate[8]
      230, // CName (1)
      130, // CName (2)
      88, // CName (3)
      0, // CName (4)
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

    testInfoPacket({
      packetClass: IS_NPL,
      size,
      type: PacketType.ISP_NPL,
      data,
      buffer,
    });
  });

  describe('property getters', () => {
    describe('isFemale', () => {
      it('should return `false` if no player flags are set', () => {
        const npl = new IS_NPL();
        expect(npl.isFemale).toEqual(false);
      });

      it('should return `true` if only `PlayerType.FEMALE` flag is set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.FEMALE;
        expect(npl.isFemale).toEqual(true);
      });

      it('should return `true` if `PlayerType.FEMALE` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.FEMALE | PlayerType.AI | PlayerType.REMOTE;
        expect(npl.isFemale).toEqual(true);
      });

      it('should return `false` if `PlayerType.FEMALE` flag is not set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.AI | PlayerType.REMOTE;
        expect(npl.isFemale).toEqual(false);
      });
    });

    describe('isMale', () => {
      it('should return `true` if no player flags are set', () => {
        const npl = new IS_NPL();
        expect(npl.isMale).toEqual(true);
      });

      it('should return `false` if only `PlayerType.FEMALE` flag is set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.FEMALE;
        expect(npl.isMale).toEqual(false);
      });

      it('should return `false` if `PlayerType.FEMALE` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.FEMALE | PlayerType.AI | PlayerType.REMOTE;
        expect(npl.isMale).toEqual(false);
      });

      it('should return `true` if `PlayerType.FEMALE` flag is not set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.AI | PlayerType.REMOTE;
        expect(npl.isMale).toEqual(true);
      });
    });

    describe('isAI', () => {
      it('should return `false` if `PlayerType.AI` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.isAI).toEqual(false);
      });

      it('should return `false` if `PlayerType.AI` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.FEMALE | PlayerType.REMOTE;
        expect(npl.isAI).toEqual(false);
      });

      it('should return `true` if `PlayerType.AI` flag is set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.AI;
        expect(npl.isAI).toEqual(true);
      });

      it('should return `true` if `PlayerType.AI` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.AI | PlayerType.FEMALE | PlayerType.REMOTE;
        expect(npl.isAI).toEqual(true);
      });
    });

    describe('isHuman', () => {
      it('should return `true` if `PlayerType.AI` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.isHuman).toEqual(true);
      });

      it('should return `true` if `PlayerType.AI` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.FEMALE | PlayerType.REMOTE;
        expect(npl.isHuman).toEqual(true);
      });

      it('should return `false` if `PlayerType.AI` flag is set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.AI;
        expect(npl.isHuman).toEqual(false);
      });

      it('should return `false` if `PlayerType.AI` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.AI | PlayerType.FEMALE | PlayerType.REMOTE;
        expect(npl.isHuman).toEqual(false);
      });
    });

    describe('isRemote', () => {
      it('should return `false` if `PlayerType.REMOTE` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.isRemote).toEqual(false);
      });

      it('should return `false` if `PlayerType.REMOTE` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.FEMALE | PlayerType.AI;
        expect(npl.isRemote).toEqual(false);
      });

      it('should return `true` if `PlayerType.REMOTE` flag is set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.REMOTE;
        expect(npl.isRemote).toEqual(true);
      });

      it('should return `true` if `PlayerType.REMOTE` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.REMOTE | PlayerType.FEMALE | PlayerType.AI;
        expect(npl.isRemote).toEqual(true);
      });
    });

    describe('isLocal', () => {
      it('should return `true` if `PlayerType.REMOTE` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.isLocal).toEqual(true);
      });

      it('should return `true` if `PlayerType.REMOTE` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.FEMALE | PlayerType.AI;
        expect(npl.isLocal).toEqual(true);
      });

      it('should return `false` if `PlayerType.REMOTE` flag is set', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.REMOTE;
        expect(npl.isLocal).toEqual(false);
      });

      it('should return `false` if `PlayerType.REMOTE` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.PType = PlayerType.REMOTE | PlayerType.FEMALE | PlayerType.AI;
        expect(npl.isLocal).toEqual(false);
      });
    });

    describe('isDriverOnLeftSide', () => {
      it('should return `false` if `PlayerFlags.PIF_LEFTSIDE` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.isDriverOnLeftSide).toEqual(false);
      });

      it('should return `false` if `PlayerFlags.PIF_LEFTSIDE` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_AUTOGEARS | PlayerFlags.PIF_SHIFTER;
        expect(npl.isDriverOnLeftSide).toEqual(false);
      });

      it('should return `true` if `PlayerFlags.PIF_LEFTSIDE` flag is set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_LEFTSIDE;
        expect(npl.isDriverOnLeftSide).toEqual(true);
      });

      it('should return `true` if `PlayerFlags.PIF_LEFTSIDE` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.Flags =
          PlayerFlags.PIF_LEFTSIDE |
          PlayerFlags.PIF_AUTOGEARS |
          PlayerFlags.PIF_SHIFTER;
        expect(npl.isDriverOnLeftSide).toEqual(true);
      });
    });

    describe('hasAutoGears', () => {
      it('should return `false` if `PlayerFlags.PIF_AUTOGEARS` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.hasAutoGears).toEqual(false);
      });

      it('should return `false` if `PlayerFlags.PIF_AUTOGEARS` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_LEFTSIDE | PlayerFlags.PIF_SHIFTER;
        expect(npl.hasAutoGears).toEqual(false);
      });

      it('should return `true` if `PlayerFlags.PIF_AUTOGEARS` flag is set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasAutoGears).toEqual(true);
      });

      it('should return `true` if `PlayerFlags.PIF_AUTOGEARS` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.Flags =
          PlayerFlags.PIF_AUTOGEARS |
          PlayerFlags.PIF_LEFTSIDE |
          PlayerFlags.PIF_SHIFTER;
        expect(npl.hasAutoGears).toEqual(true);
      });
    });

    describe('hasShifter', () => {
      it('should return `false` if `PlayerFlags.PIF_SHIFTER` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.hasShifter).toEqual(false);
      });

      it('should return `false` if `PlayerFlags.PIF_SHIFTER` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_LEFTSIDE | PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasShifter).toEqual(false);
      });

      it('should return `true` if `PlayerFlags.PIF_SHIFTER` flag is set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_SHIFTER;
        expect(npl.hasShifter).toEqual(true);
      });

      it('should return `true` if `PlayerFlags.PIF_SHIFTER` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.Flags =
          PlayerFlags.PIF_SHIFTER |
          PlayerFlags.PIF_LEFTSIDE |
          PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasShifter).toEqual(true);
      });
    });

    describe('hasBrakeHelp', () => {
      it('should return `false` if `PlayerFlags.PIF_HELP_B` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.hasBrakeHelp).toEqual(false);
      });

      it('should return `false` if `PlayerFlags.PIF_HELP_B` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_LEFTSIDE | PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasBrakeHelp).toEqual(false);
      });

      it('should return `true` if `PlayerFlags.PIF_HELP_B` flag is set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_HELP_B;
        expect(npl.hasBrakeHelp).toEqual(true);
      });

      it('should return `true` if `PlayerFlags.PIF_HELP_B` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.Flags =
          PlayerFlags.PIF_HELP_B |
          PlayerFlags.PIF_LEFTSIDE |
          PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasBrakeHelp).toEqual(true);
      });
    });

    describe('isInPits', () => {
      it('should return `false` if `PlayerFlags.PIF_INPITS` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.isInPits).toEqual(false);
      });

      it('should return `false` if `PlayerFlags.PIF_INPITS` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_LEFTSIDE | PlayerFlags.PIF_AUTOGEARS;
        expect(npl.isInPits).toEqual(false);
      });

      it('should return `true` if `PlayerFlags.PIF_INPITS` flag is set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_INPITS;
        expect(npl.isInPits).toEqual(true);
      });

      it('should return `true` if `PlayerFlags.PIF_INPITS` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.Flags =
          PlayerFlags.PIF_INPITS |
          PlayerFlags.PIF_LEFTSIDE |
          PlayerFlags.PIF_AUTOGEARS;
        expect(npl.isInPits).toEqual(true);
      });
    });

    describe('hasAutoClutch', () => {
      it('should return `false` if `PlayerFlags.PIF_AUTOCLUTCH` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.hasAutoClutch).toEqual(false);
      });

      it('should return `false` if `PlayerFlags.PIF_AUTOCLUTCH` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_LEFTSIDE | PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasAutoClutch).toEqual(false);
      });

      it('should return `true` if `PlayerFlags.PIF_AUTOCLUTCH` flag is set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_AUTOCLUTCH;
        expect(npl.hasAutoClutch).toEqual(true);
      });

      it('should return `true` if `PlayerFlags.PIF_AUTOCLUTCH` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.Flags =
          PlayerFlags.PIF_AUTOCLUTCH |
          PlayerFlags.PIF_LEFTSIDE |
          PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasAutoClutch).toEqual(true);
      });
    });

    describe('hasMouseSteering', () => {
      it('should return `false` if `PlayerFlags.PIF_MOUSE` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.hasMouseSteering).toEqual(false);
      });

      it('should return `false` if `PlayerFlags.PIF_MOUSE` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_LEFTSIDE | PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasMouseSteering).toEqual(false);
      });

      it('should return `true` if `PlayerFlags.PIF_MOUSE` flag is set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_MOUSE;
        expect(npl.hasMouseSteering).toEqual(true);
      });

      it('should return `true` if `PlayerFlags.PIF_MOUSE` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.Flags =
          PlayerFlags.PIF_MOUSE |
          PlayerFlags.PIF_LEFTSIDE |
          PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasMouseSteering).toEqual(true);
      });
    });

    describe('hasKeyboardSteeringNoHelp', () => {
      it('should return `false` if `PlayerFlags.PIF_KB_NO_HELP` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.hasKeyboardSteeringNoHelp).toEqual(false);
      });

      it('should return `false` if `PlayerFlags.PIF_KB_NO_HELP` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_LEFTSIDE | PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasKeyboardSteeringNoHelp).toEqual(false);
      });

      it('should return `true` if `PlayerFlags.PIF_KB_NO_HELP` flag is set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_KB_NO_HELP;
        expect(npl.hasKeyboardSteeringNoHelp).toEqual(true);
      });

      it('should return `true` if `PlayerFlags.PIF_KB_NO_HELP` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.Flags =
          PlayerFlags.PIF_KB_NO_HELP |
          PlayerFlags.PIF_LEFTSIDE |
          PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasKeyboardSteeringNoHelp).toEqual(true);
      });
    });

    describe('hasKeyboardSteeringStabilised', () => {
      it('should return `false` if `PlayerFlags.PIF_KB_STABILISED` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.hasKeyboardSteeringStabilised).toEqual(false);
      });

      it('should return `false` if `PlayerFlags.PIF_KB_STABILISED` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_LEFTSIDE | PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasKeyboardSteeringStabilised).toEqual(false);
      });

      it('should return `true` if `PlayerFlags.PIF_KB_STABILISED` flag is set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_KB_STABILISED;
        expect(npl.hasKeyboardSteeringStabilised).toEqual(true);
      });

      it('should return `true` if `PlayerFlags.PIF_KB_STABILISED` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.Flags =
          PlayerFlags.PIF_KB_STABILISED |
          PlayerFlags.PIF_LEFTSIDE |
          PlayerFlags.PIF_AUTOGEARS;
        expect(npl.hasKeyboardSteeringStabilised).toEqual(true);
      });
    });

    describe('isInCustomView', () => {
      it('should return `false` if `PlayerFlags.PIF_CUSTOM_VIEW` flag is not set', () => {
        const npl = new IS_NPL();
        expect(npl.isInCustomView).toEqual(false);
      });

      it('should return `false` if `PlayerFlags.PIF_CUSTOM_VIEW` flag is not set but other flags are set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_LEFTSIDE | PlayerFlags.PIF_AUTOGEARS;
        expect(npl.isInCustomView).toEqual(false);
      });

      it('should return `true` if `PlayerFlags.PIF_CUSTOM_VIEW` flag is set', () => {
        const npl = new IS_NPL();
        npl.Flags = PlayerFlags.PIF_CUSTOM_VIEW;
        expect(npl.isInCustomView).toEqual(true);
      });

      it('should return `true` if `PlayerFlags.PIF_CUSTOM_VIEW` flag is set with other flags', () => {
        const npl = new IS_NPL();
        npl.Flags =
          PlayerFlags.PIF_CUSTOM_VIEW |
          PlayerFlags.PIF_LEFTSIDE |
          PlayerFlags.PIF_AUTOGEARS;
        expect(npl.isInCustomView).toEqual(true);
      });
    });
  });
});
