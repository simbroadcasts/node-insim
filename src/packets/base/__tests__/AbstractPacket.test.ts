import { byte, byteArray, string } from '../../../utils';
import { PacketType } from '../..';
import { AbstractPacket } from '../../base';

describe('AbstractPacket', () => {
  describe('getValidPropertyNames', () => {
    it('should return an empty array if no properties are annotated', () => {
      class CustomPacket extends AbstractPacket {
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
      class CustomPacket extends AbstractPacket {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @string(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
        @byteArray(4) NumberArray = [1, 2, 4, 6];
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
        'NumberArray',
      ]);
    });
  });

  describe('getFormat', () => {
    it('should return the jspack format of all valid properties', () => {
      class CustomPacket extends AbstractPacket {
        @byte() Size = 2;
        @byte() Type = PacketType.ISP_ISI;
        @byte() ReqI = 1;
        @string(6) StringProperty = 'string';
        @byte() NumberProperty = 0;
        @byteArray(4) NumberArray = [1, 2, 4, 6];
        InvalidProperty = 'invalid';

        public getFormat() {
          return super.getFormat();
        }
      }

      const packet = new CustomPacket();

      expect(packet.getFormat()).toEqual('BBB6sB4A');
    });

    it('should override property format if provided', () => {
      class CustomPacket extends AbstractPacket {
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
});
