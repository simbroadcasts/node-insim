import { byte, string, struct } from '../../decorators';
import { stringToBytes } from '../../tests';
import { PacketType } from '../enums';
import { Struct } from './Struct';

describe('Struct', () => {
  describe('getValidPropertyNames', () => {
    it('should return an empty array if no properties are annotated', () => {
      class CustomPacket extends Struct {
        Size = 2;
        Type = PacketType.ISP_ISI;
        ReqI = 1;
        StringProperty = 'string';

        public getValidPropertyNames() {
          return super.getValidPropertyNames();
        }
      }

      const packet = new CustomPacket();

      expect(packet.getValidPropertyNames()).toEqual([]);
    });

    it('should return list of annotated properties', () => {
      class CustomPacket extends Struct {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @string(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
        InvalidProperty = 'invalid';

        public getValidPropertyNames() {
          return super.getValidPropertyNames();
        }
      }

      const packet = new CustomPacket();

      expect(packet.getValidPropertyNames()).toEqual([
        'Size',
        'Type',
        'ReqI',
        'StringProperty',
        'NumberProperty',
      ]);
    });
  });

  describe('getFormat', () => {
    it('should return the jspack format of all valid properties', () => {
      class CustomPacket extends Struct {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @string(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
        InvalidProperty = 'invalid';

        public getFormat() {
          return super.getFormat();
        }
      }

      const packet = new CustomPacket();

      expect(packet.getFormat()).toEqual('BBB6sB');
    });

    it('should override property format if provided', () => {
      class CustomPacket extends Struct {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @string(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
        InvalidProperty = 'invalid';

        public getFormat() {
          return super.getFormat({
            NumberProperty: 'C',
          });
        }
      }

      const packet = new CustomPacket();

      expect(packet.getFormat()).toEqual('BBB6sC');
    });
  });

  it('should unpack binary data', () => {
    class SubStruct extends Struct {
      @byte() Byte1 = 0;
      @byte() Byte2 = 0;
    }

    class CustomStruct extends Struct {
      @string(6) StringProperty = 'string';
      @byte() NumberProperty = 0;
      @struct(SubStruct) SubStructProperty = new SubStruct();
    }

    const buffer = new Uint8Array([
      ...stringToBytes('test'), // StringProperty[6]
      0,
      0,
      25, // NumberProperty
      2, // Byte1
      4, // Byte2
    ]);
    const packet = new CustomStruct().unpack(buffer);

    expect(packet.StringProperty).toEqual('test');
    expect(packet.NumberProperty).toEqual(25);
    expect(packet.SubStructProperty.Byte1).toEqual(2);
    expect(packet.SubStructProperty.Byte2).toEqual(4);
  });
});
