import { stringToBytes, testSendablePacket } from '../../utils';
import type { IS_MST_Data } from '..';
import { IS_MST, PacketType } from '..';
import { BasePacket } from '../BasePacket';

const data: IS_MST_Data = {
  Msg: 'This is a message whose length will be sixty four characters ye',
};

const expectedBuffer = Buffer.from([
  68 / BasePacket.SIZE_MULTIPLIER, // Size
  PacketType.ISP_MST, // Type
  0, // ReqI
  0, // Zero
  ...stringToBytes(data.Msg),
  0,
]);

describe('IS_MST', () => {
  testSendablePacket(IS_MST, 68, PacketType.ISP_MST, data, expectedBuffer);
});
