import { isFlagOn } from './bitwiseFlags';

describe('Bitwise flags', () => {
  describe('isFlagOn', () => {
    it('should return true only if the bitwise flag is on in the property value', () => {
      enum Flags {
        ONE = 1,
        TWO = 2,
        THREE = 4,
      }

      const data: { flags: Flags | 0 } = {
        flags: Flags.ONE | Flags.TWO,
      };

      expect(isFlagOn(data.flags, Flags.ONE)).toEqual(true);
      expect(isFlagOn(data.flags, Flags.THREE)).toEqual(false);
    });
  });
});
