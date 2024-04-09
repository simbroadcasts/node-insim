import type { PacketTestData } from '../tests';
import { testInfoPacket } from '../tests';
import {
  InterfaceMode,
  ObjectIndex,
  PacketType,
  ShiftUInterfaceSubmode,
} from './enums';
import { IS_CIM } from './IS_CIM';

const size = 8;

const data: PacketTestData<IS_CIM> = {
  UCID: 4,
  Mode: InterfaceMode.CIM_SHIFTU,
  SubMode: ShiftUInterfaceSubmode.FVM_EDIT,
  SelType: ObjectIndex.AXO_CHALK_LINE2,
};

const buffer = new Uint8Array([
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
