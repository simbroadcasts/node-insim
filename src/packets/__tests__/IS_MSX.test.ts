import { stringToBytes, testSendablePacket } from '../../utils';
import type { IS_MSX_Data } from '..';
import { IS_MSX, PacketType } from '..';
import { BasePacket } from '../BasePacket';

const data: IS_MSX_Data = {
  Msg: 'You know that this is a very long text message whose length can be up to ninety five characters',
};

const expectedBuffer = Buffer.from([
  100 / BasePacket.SIZE_MULTIPLIER, // Size
  39, // Type
  0, // ReqI
  0, // Zero
  ...stringToBytes(data.Msg),
  0,
]);

describe('IS_MSX', () => {
  testSendablePacket(IS_MSX, 100, PacketType.ISP_MSX, data, expectedBuffer);
});
