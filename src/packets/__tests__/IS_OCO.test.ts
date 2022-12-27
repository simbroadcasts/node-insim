import { testInstructionPacket } from '../../utils/tests';
import type { IS_OCO_Data } from '..';
import {
  IS_OCO,
  ObjectIndex,
  OCOAction,
  OCOAutocrossStartLights,
  PacketType,
} from '..';
import { AbstractPacket } from '../base';

const size = 8;

const data: IS_OCO_Data = {
  OCOAction: OCOAction.OCO_LIGHTS_SET,
  Index: ObjectIndex.AXO_START_LIGHTS,
  Identifier: 35,
  Data: OCOAutocrossStartLights.RED | OCOAutocrossStartLights.AMBER,
};

const buffer = Buffer.from([
  size / AbstractPacket.SIZE_MULTIPLIER, // Size
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
