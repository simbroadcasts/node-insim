import Mitm from 'mitm';

import { TCP } from '../TCP';

describe('TCP', () => {
  let mitm: ReturnType<typeof Mitm>;

  beforeEach(() => {
    mitm = Mitm();
  });

  it('should connect to a TCP socket', (done) => {
    const tcp = new TCP('127.0.0.1', 12345);
    mitm.on('connection', () => {
      tcp.disconnect();
      done();
    });

    tcp.connect();
  });

  it('should send a valid packet', (done) => {
    const tcp = new TCP('127.0.0.1', 12345);

    mitm.on('connection', (socket) => {
      socket.write(new Uint8Array([1, 3, 0, 0]));
    });

    tcp.connect();
    tcp.on('packet', (buffer: Buffer) => {
      expect(buffer.equals(Buffer.from([1, 3, 0, 0]))).toEqual(true);
      tcp.disconnect();
      done();
    });
  });

  it('should send multiple packets', (done) => {
    const packets = [
      [1, 3, 0, 0],
      [2, 0, 0, 44, 100, 124, 1, 1],
      [1, 0, 54, 25],
    ];
    const packetByteArray = [...packets[0], ...packets[1], ...packets[2]];
    let packetsReceived = 0;

    const tcp = new TCP('127.0.0.1', 12345);

    mitm.on('connection', (socket) => {
      socket.write(new Uint8Array(packetByteArray));
    });

    tcp.connect();
    tcp.on('packet', (buffer: Buffer) => {
      expect(buffer.equals(Buffer.from(packets[packetsReceived]))).toEqual(
        true,
      );

      packetsReceived++;

      if (packetsReceived === packets.length) {
        tcp.disconnect();
        done();
      }
    });
  });
});
