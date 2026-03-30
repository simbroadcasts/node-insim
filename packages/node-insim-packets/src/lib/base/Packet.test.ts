import { byte, byteArray, string, stringNull } from '../decorators.js';
import { PacketType } from '../enums/PacketType.js';
import { Packet } from './Packet.js';

describe('Packet', () => {
  describe('getValidPropertyNames', () => {
    it('should return an empty array if no properties are annotated', () => {
      class CustomPacket extends Packet {
        Size = 2;
        Type = PacketType.ISP_ISI;
        ReqI = 1;
        StringProperty = 'string';

        public override getValidPropertyNames() {
          return super.getValidPropertyNames();
        }
      }

      const packet = new CustomPacket();

      expect(packet.getValidPropertyNames()).toEqual([]);
    });

    it('should return list of annotated properties', () => {
      class CustomPacket extends Packet {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @string(6) StringProperty = 'string';
        @stringNull(6) StringNullProperty = 'string';
        @byte() NumberProperty = 0;
        @byteArray(4) NumberArray = [1, 2, 4, 6];
        InvalidProperty = 'invalid';

        public override getValidPropertyNames() {
          return super.getValidPropertyNames();
        }
      }

      const packet = new CustomPacket();

      expect(packet.getValidPropertyNames()).toEqual([
        'Size',
        'Type',
        'ReqI',
        'StringProperty',
        'StringNullProperty',
        'NumberProperty',
        'NumberArray',
      ]);
    });
  });

  describe('getFormat', () => {
    it('should return the jspack format of all valid properties', () => {
      class CustomPacket extends Packet {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @string(6) StringProperty = 'string';
        @stringNull(6) StringNullProperty = 'string';
        @byte() NumberProperty = 0;
        @byteArray(4) NumberArray = [1, 2, 4, 6];
        InvalidProperty = 'invalid';

        public override getFormat() {
          return super.getFormat();
        }
      }

      const packet = new CustomPacket();

      expect(packet.getFormat()).toEqual('BBB6s6SB4A');
    });

    it('should override property format if provided', () => {
      class CustomPacket extends Packet {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @string(6) StringProperty = 'string';
        @stringNull(6) StringNullProperty = 'string';
        @byte() NumberProperty = 0;
        InvalidProperty = 'invalid';

        public override getFormat() {
          return super.getFormat({
            NumberProperty: 'C',
          });
        }
      }

      const packet = new CustomPacket();

      expect(packet.getFormat()).toEqual('BBB6s6SC');
    });
  });
});
