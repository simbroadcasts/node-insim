import type { PacketTestData } from '../tests';
import { stringToBytes, testInfoPacket } from '../tests';
import { PacketType } from './enums';
import { IS_MSO, UserType } from './IS_MSO';

describe('IS_MSO', () => {
  describe('ASCII characters in message', () => {
    const size = 24;
    const msg = 'Player : Hello!';

    const data: PacketTestData<IS_MSO> = {
      ReqI: 0,
      Zero: 0,
      UCID: 2,
      PLID: 4,
      UserType: UserType.MSO_USER,
      TextStart: 14,
      Msg: msg,
    };

    const buffer = new Uint8Array([
      size / new IS_MSO().SIZE_MULTIPLIER, // Size
      11, // Type
      0, // ReqI
      0, // Zero
      2, // UCID
      4, // PLID
      1, // UserType
      14, // TextStart
      ...stringToBytes(msg), // Msg[128]
      0,
    ]);

    testInfoPacket({
      packetClass: IS_MSO,
      size,
      type: PacketType.ISP_MSO,
      data,
      buffer,
    });
  });

  xdescribe('non-ASCII characters in message', () => {
    const size = 36;

    const data: PacketTestData<IS_MSO> = {
      ReqI: 0,
      Zero: 0,
      UCID: 2,
      PLID: 4,
      UserType: UserType.MSO_USER,
      TextStart: 15, // After converting Msg from bytes into UTF-8
      Msg: '^7Player ě ^7: ^8cršč',
    };

    const buffer = new Uint8Array([
      size / new IS_MSO().SIZE_MULTIPLIER, // Size
      11, // Type
      0, // ReqI
      0, // Zero
      2, // UCID
      4, // PLID
      1, // UserType
      17, // TextStart
      94, // Msg
      55,
      80,
      108,
      97,
      121,
      101,
      114,
      32,
      94,
      69,
      236,
      32,
      94,
      55,
      58,
      32,
      94,
      56,
      99,
      114,
      154,
      94,
      69,
      232,
      0,
      0,
      0,
    ]);

    testInfoPacket({
      packetClass: IS_MSO,
      size,
      type: PacketType.ISP_MSO,
      data,
      buffer,
    });
  });
});
