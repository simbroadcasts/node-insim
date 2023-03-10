import { byte, byteArray, string, struct } from '../../../utils';
import { stringToBytes } from '../../../utils/tests';
import { PacketType } from '../../';
import { SendablePacket, SendableStruct } from '../../base';

class TestStruct extends SendableStruct {
  @byte() First = 5;
  @byte() Second = 10;
  @string(3) Third = 'abc';
}

describe('SendablePacket', () => {
  describe('initialize', () => {
    it('should populate instance properties using initialize()', () => {
      class CustomPacket extends SendablePacket {
        Size = 2;
        Type = PacketType.ISP_ISI;
        ReqI = 1;
        StringProperty = 'old';
        NumberProperty = 0;

        constructor(data?: Record<string, unknown>) {
          super();
          this.initialize(data);
        }
      }

      const packet = new CustomPacket({
        StringProperty: 'new',
        NumberProperty: 2,
      });

      expect(packet.StringProperty).toEqual('new');
      expect(packet.NumberProperty).toEqual(2);
    });

    it('should unpack binary data', () => {
      class CustomPacket extends SendablePacket {
        @byte() Size = 0;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @string(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
        @byteArray(4) NumberArray = [];
      }

      const buffer = new Uint8Array([
        8 / new CustomPacket().SIZE_MULTIPLIER, // Size
        PacketType.ISP_NCN, // Type
        2, // ReqI
        ...stringToBytes('test'), // StringProperty[6]
        0,
        0,
        25, // NumberProperty
        1, // NumberArray[0]
        3, // NumberArray[1]
        6, // NumberArray[2]
        7, // NumberArray[3]
      ]);
      const packet = new CustomPacket().unpack(buffer);

      expect(packet.Size).toEqual(8);
      expect(packet.Type).toEqual(PacketType.ISP_NCN);
      expect(packet.ReqI).toEqual(2);
      expect(packet.StringProperty).toEqual('test');
      expect(packet.NumberProperty).toEqual(25);
      expect(packet.NumberArray).toEqual([1, 3, 6, 7]);
    });

    it('pack data into a buffer', () => {
      class CustomPacket extends SendablePacket {
        @byte() Size = 8;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 2;
        @string(6) StringProperty = 'test';
        @byte() NumberProperty = 25;
        @byteArray(4) NumberArray = [1, 3, 6, 7];
        @struct(TestStruct) Struct = new TestStruct();
      }

      const expectedBuffer = new Uint8Array([
        8 / new CustomPacket().SIZE_MULTIPLIER, // Size
        PacketType.ISP_ISI, // Type
        2, // ReqI
        ...stringToBytes('test'), // StringProperty[6]
        0,
        0,
        25, // NumberProperty
        1, // NumberArray[0]
        3, // NumberArray[1]
        6, // NumberArray[2]
        7, // NumberArray[3]
        5,
        10,
        ...stringToBytes('abc'),
      ]);
      const buffer = new CustomPacket().pack();

      expect(buffer).toEqual(expectedBuffer);
    });
  });
});
