import * as dgram from 'dgram';
import type { AddressInfo } from 'net';

import { UDP } from './UDP';

function getFreePort(): Promise<number> {
  return new Promise((resolve) => {
    const socket = dgram.createSocket('udp4');
    socket.bind(0, '127.0.0.1', () => {
      const { port } = socket.address() as AddressInfo;
      socket.close(() => resolve(port));
    });
  });
}

describe('UDP', () => {
  describe('bind mode', () => {
    it('binds to `port` when `localPort` is not given', async () => {
      const port = await getFreePort();

      return new Promise<void>((done) => {
        const udp = new UDP({
          host: '127.0.0.1',
          port,
          socketInitialisationMode: 'bind',
        });

        const peer = dgram.createSocket('udp4');

        udp.on('connect', () => {
          peer.send(Buffer.from([1, 2, 3]), port, '127.0.0.1');
        });

        udp.on('data', (data) => {
          expect(data).toEqual(Buffer.from([1, 2, 3]));
          peer.close();
          udp.disconnect();
          done();
        });

        udp.connect();
      });
    });

    it('binds to `localPort` and sends to `host`:`port`', async () => {
      const port = await getFreePort();
      const localPort = await getFreePort();

      return new Promise<void>((done) => {
        const fakeLfs = dgram.createSocket('udp4');
        fakeLfs.bind(port, '127.0.0.1');

        const udp = new UDP({
          host: '127.0.0.1',
          port,
          socketInitialisationMode: 'bind',
          localPort,
        });

        fakeLfs.on('message', (data, rinfo) => {
          expect(data).toEqual(Buffer.from([4, 5, 6]));
          expect(rinfo.port).toEqual(localPort);

          fakeLfs.send(Buffer.from([7, 8, 9]), localPort, '127.0.0.1');
        });

        udp.on('connect', () => {
          udp.send(Buffer.from([4, 5, 6]));
        });

        udp.on('data', (data) => {
          expect(data).toEqual(Buffer.from([7, 8, 9]));
          fakeLfs.close();
          udp.disconnect();
          done();
        });

        udp.connect();
      });
    });
  });

  describe('connect mode', () => {
    it('connects to the remote peer and exchanges data', async () => {
      const port = await getFreePort();

      return new Promise<void>((done) => {
        const peer = dgram.createSocket('udp4');
        peer.bind(port, '127.0.0.1');

        peer.on('message', (data, rinfo) => {
          expect(data).toEqual(Buffer.from([1, 2, 3]));
          peer.send(Buffer.from([4, 5, 6]), rinfo.port, rinfo.address);
        });

        const udp = new UDP({
          host: '127.0.0.1',
          port,
          socketInitialisationMode: 'connect',
        });

        udp.on('connect', () => {
          udp.send(Buffer.from([1, 2, 3]));
        });

        udp.on('data', (data) => {
          expect(data).toEqual(Buffer.from([4, 5, 6]));
          peer.close();
          udp.disconnect();
          done();
        });

        udp.connect();
      });
    });
  });
});
