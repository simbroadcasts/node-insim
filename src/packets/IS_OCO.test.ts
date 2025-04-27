import { testInstructionPacket } from '../tests';
import { ObjectIndex, PacketType } from './enums';
import type { IS_OCO_Data } from './IS_OCO';
import { OCOAutocrossStartLights } from './IS_OCO';
import { OCOAction } from './IS_OCO';
import { IS_OCO } from './IS_OCO';

const size = 8;

const data: IS_OCO_Data = {
  OCOAction: OCOAction.OCO_LIGHTS_SET,
  Index: ObjectIndex.AXO_START_LIGHTS,
  Identifier: 35,
  Data: OCOAutocrossStartLights.RED | OCOAutocrossStartLights.AMBER,
};

const buffer = new Uint8Array([
  size / new IS_OCO().SIZE_MULTIPLIER, // Size
  60, // Type
  0, // ReqI
  0, // Zero
  5, // OCOAction
  149, // Index
  35, // Identifier
  3, // Data
]);

describe('IS_OCO', () => {
  testInstructionPacket({
    packetClass: IS_OCO,
    type: PacketType.ISP_OCO,
    size,
    data,
    buffer,
  });
});
