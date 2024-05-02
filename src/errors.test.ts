import { InSimError } from 'node-insim';

describe('errors', () => {
  describe('InSimError', () => {
    it('should be defined', () => {
      expect(InSimError).toBeDefined();
      expect(typeof InSimError).toEqual('function');
    });

    it('should be an instance of Error', () => {
      expect(new InSimError('error')).toBeInstanceOf(Error);
    });

    it('should have a name property equal to "InSimError"', () => {
      expect(new InSimError('error').name).toEqual('InSimError');
    });

    it('should set the message property from constructor', () => {
      expect(new InSimError('error').message).toEqual('error');
    });
  });
});
