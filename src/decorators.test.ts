import {
  array,
  byte,
  byteArray,
  double,
  float,
  getFormat,
  int,
  short,
  string,
  stringNull,
  struct,
  unsigned,
  Vec,
  Vector,
  word,
} from './decorators';
import { Struct } from './packets/base';

class DummyStruct extends Struct {
  @string(2) String = 'ab';
  @byte() Byte = 1;
}

describe('Class property decorators', () => {
  it('should return the correct jspack char for each binary data type', () => {
    class TestClass {
      @string(1) Char = 'a';
      @string(3) String = 'abc';
      @stringNull(3) StringNull = 'abc';
      @byte() Byte = 255;
      @byteArray(5) ByteArray = [34, 67, 255, 0, 5];
      @word() Word = 65535;
      @short() Short = -32767;
      @unsigned() Unsigned = 4294967295;
      @int() Int = -2147483648;
      @float() Float = 1.2e-38;
      @double() Double = 1.2e-308;
      @Vector() Vector = [12.34, -56.78, 90.12];
      @Vec() Vec = [1234, -5678, 901213];
      @array(DummyStruct, 3) Array = [
        new DummyStruct(),
        new DummyStruct(),
        new DummyStruct(),
      ];
      @struct(DummyStruct) Struct = new DummyStruct();
    }

    const packet = new TestClass();

    expect(getFormat(packet, 'Char')).toEqual('c');
    expect(getFormat(packet, 'String')).toEqual('3s');
    expect(getFormat(packet, 'StringNull')).toEqual('3S');
    expect(getFormat(packet, 'Byte')).toEqual('B');
    expect(getFormat(packet, 'ByteArray')).toEqual('5A');
    expect(getFormat(packet, 'Word')).toEqual('H');
    expect(getFormat(packet, 'Short')).toEqual('h');
    expect(getFormat(packet, 'Unsigned')).toEqual('L');
    expect(getFormat(packet, 'Int')).toEqual('l');
    expect(getFormat(packet, 'Float')).toEqual('f');
    expect(getFormat(packet, 'Double')).toEqual('d');
    expect(getFormat(packet, 'Vector')).toEqual('fff');
    expect(getFormat(packet, 'Vec')).toEqual('lll');
    expect(getFormat(packet, 'Array')).toEqual('2sB2sB2sB');
    expect(getFormat(packet, 'Struct')).toEqual('2sB');
  });
});
