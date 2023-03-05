import type { PacketTestData } from '../../utils/tests';
import { testInfoPacket } from '../../utils/tests';
import {
  InterfaceMode,
  IS_CIM,
  ObjectIndex,
  PacketType,
  ShiftUInterfaceSubmode,
} from '..';

const size = 8;

const data: PacketTestData<IS_CIM> = {
  UCID: 4,
  Mode: InterfaceMode.CIM_SHIFTU,
  SubMode: ShiftUInterfaceSubmode.FVM_EDIT,
  SelType: ObjectIndex.AXO_CHALK_LINE2,
};

const buffer = Buffer.from([
  size / new IS_CIM().SIZE_MULTIPLIER, // Size
  64, // Type
  0, // ReqI
  4, // UCID
  6, // Mode
  2, // SubMode
  5, // SelType
  0, // Sp3
]);

describe('IS_CIM', () => {
  testInfoPacket({
    packetClass: IS_CIM,
    type: PacketType.ISP_CIM,
    size,
    data,
    buffer,
  });
});
