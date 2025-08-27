import Mitm from 'mitm';

import { InSim } from './InSim';
import { InSimFlags, IS_TINY, PacketType, TinyType } from './packets';
import { stringToBytes } from './tests';

describe('InSim', () => {
  let mitm: ReturnType<typeof Mitm>;

  beforeEach(() => {
    mitm = Mitm();
  });

  it('should be exported', () => {
    expect(InSim).toBeDefined();
    expect(typeof InSim).toEqual('function');
  });

  it('should expose INSIM_VERSION equal to 9', () => {
    expect(InSim.INSIM_VERSION).toEqual(9);
  });

  describe('options', () => {
    it('should have default values', () => {
      const insim = new InSim();
      expect(insim.options).toEqual({
        Host: '127.0.0.1',
        Port: 29999,
        Protocol: 'TCP',
        ReqI: 0,
        UDPPort: 0,
        Flags: 0,
        Prefix: '',
        Interval: 0,
        Admin: '',
        IName: '',
      });
    });
  });

  describe('id', () => {
    it('should be a random string by default', () => {
      const inSim = new InSim();
      expect(typeof inSim.id).toEqual('string');
    });

    it('should be configurable', () => {
      const inSim = new InSim('foo');
      expect(inSim.id).toEqual('foo');
    });
  });

  describe('InSim connection', () => {
    it('should connect using TCP and send an IS_ISI packet', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        mitm.on('connection', (_socket, opts) => {
          expect(opts.host).toEqual('127.0.0.1');
          expect(opts.port).toEqual(29999);

          inSim.disconnect();
          done();
        });

        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });
      }));

    it('should connect using custom options', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        mitm.on('connection', (socket, opts) => {
          expect(opts.host).toEqual('192.161.4.1');
          expect(opts.port).toEqual(29998);

          socket.on('data', (data) => {
            expect(data).toEqual(
              Buffer.from([
                11, // Size / 4
                1, // PacketType.ISP_ISI
                3, // ReqI
                0, // Zero
                45, // UDPPort (1)
                117, // UDPPort (2)
                64, // InSimFlags.ISF_CON (1)
                0, // InSimFlags.ISF_CON (2)
                9, // InSimVer
                '!'.charCodeAt(0), // Prefix
                10, // Interval (1)
                0, // Interval (2)
                ...stringToBytes('adminPassword\0\0\0'), // Admin[16]
                ...stringToBytes('Node InSim\0\0\0\0\0\0'), // IName[16]
              ]),
            );

            inSim.disconnect();
            done();
          });
        });

        inSim.connect({
          Host: '192.161.4.1',
          Port: 29998,
          ReqI: 3,
          UDPPort: 29997,
          Flags: InSimFlags.ISF_CON,
          Prefix: '!',
          Interval: 10,
          Admin: 'adminPassword',
          IName: 'Node InSim',
        });

        expect(inSim.options).toEqual({
          Host: '192.161.4.1',
          Port: 29998,
          ReqI: 3,
          UDPPort: 29997,
          Flags: InSimFlags.ISF_CON,
          Prefix: '!',
          Protocol: 'TCP',
          Interval: 10,
          Admin: 'adminPassword',
          IName: 'Node InSim',
        });
      }));

    it('should connect only once', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        mitm.on('connection', () => {
          inSim.disconnect();
          done();
        });

        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });
        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });
      }));
  });

  describe('sending packets', () => {
    let mitm: ReturnType<typeof Mitm>;

    beforeEach(() => {
      mitm = Mitm();
    });

    it('should send a packet', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        mitm.on('connection', (socket) => {
          socket.on('data', (data) => {
            expect(data).toEqual(
              Buffer.from([
                1, // Size / 4
                3, // PacketType.ISP_TINY
                25, // ReqI
                3, // TinyType.TINY_PING
              ]),
            );
            inSim.disconnect();
            done();
          });
        });

        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });

        inSim.send(
          new IS_TINY({
            ReqI: 25,
            SubT: TinyType.TINY_PING,
          }),
        );
      }));
  });

  describe('sending messages or commands', () => {
    let mitm: ReturnType<typeof Mitm>;

    beforeEach(() => {
      mitm = Mitm();
    });

    it('should send a command via IS_MST', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        mitm.on('connection', (socket) => {
          socket.on('data', (data) => {
            expect(data).toEqual(
              Buffer.from([
                17, // Size / 4
                13, // PacketType.ISP_MST
                0, // ReqI
                0, // Zero
                47, // /
                101, // e
                110, // n
                100, // d
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
              ]),
            );
            inSim.disconnect();
            done();
          });
        });

        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });

        inSim.sendMessage('/end');
      }));

    it('should send a message via IS_MST if it is shorter than 64 characters', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        mitm.on('connection', (socket) => {
          socket.on('data', (data) => {
            expect(data).toEqual(
              Buffer.from([
                17, // Size / 4
                13, // PacketType.ISP_MST
                0, // ReqI
                0, // Zero
                84, // Msg[64]
                104,
                105,
                115,
                32,
                105,
                115,
                32,
                97,
                32,
                109,
                101,
                115,
                115,
                97,
                103,
                101,
                32,
                116,
                104,
                97,
                116,
                32,
                105,
                115,
                32,
                115,
                104,
                111,
                114,
                116,
                101,
                114,
                32,
                116,
                104,
                97,
                110,
                32,
                54,
                52,
                32,
                99,
                104,
                97,
                114,
                97,
                99,
                116,
                101,
                114,
                115,
                32,
                101,
                120,
                97,
                99,
                116,
                108,
                121,
                32,
                54,
                51,
                0,
              ]),
            );
            inSim.disconnect();
            done();
          });
        });

        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });

        inSim.sendMessage(
          'This is a message that is shorter than 64 characters exactly 63',
        );
      }));

    it('should send a message via IS_MSX if it is 64 characters or longer', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        mitm.on('connection', (socket) => {
          socket.on('data', (data) => {
            expect(data).toEqual(
              Buffer.from([
                25, // Size / 4
                39, // PacketType.ISP_MSX
                0, // ReqI
                0, // Zero
                84, // Msg[96]
                104,
                105,
                115,
                32,
                105,
                115,
                32,
                97,
                110,
                111,
                116,
                104,
                101,
                114,
                32,
                108,
                111,
                110,
                103,
                32,
                109,
                101,
                115,
                115,
                97,
                103,
                101,
                32,
                116,
                104,
                97,
                116,
                32,
                105,
                115,
                32,
                101,
                120,
                97,
                99,
                116,
                108,
                121,
                32,
                54,
                52,
                32,
                99,
                104,
                97,
                114,
                97,
                99,
                116,
                101,
                114,
                115,
                32,
                108,
                111,
                110,
                103,
                33,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
              ]),
            );
            inSim.disconnect();
            done();
          });
        });

        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });

        inSim.sendMessage(
          'This is another long message that is exactly 64 characters long!',
        );
      }));
  });

  describe('receiving packets', () => {
    let mitm: ReturnType<typeof Mitm>;

    beforeEach(() => {
      mitm = Mitm();
    });

    it('should receive a packet', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        inSim.on(PacketType.ISP_TINY, (packet) => {
          expect(packet.SubT).toEqual(TinyType.TINY_REPLY);
          done();
        });

        mitm.on('connection', (socket) => {
          socket.write(
            new Uint8Array([
              1, // Size / 4
              3, // PacketType.ISP_TINY
              25, // ReqI
              4, // TinyType.TINY_REPLY
            ]),
          );
        });

        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });
      }));
  });

  describe('keep-alive packet', () => {
    it('should respond to a TINY_NONE packet', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        inSim.on(PacketType.ISP_TINY, (packet) => {
          expect(packet.SubT).toEqual(TinyType.TINY_NONE);
        });

        mitm.on('connection', (socket) => {
          socket.write(
            new Uint8Array([
              1, // Size / 4
              3, // PacketType.ISP_TINY
              0, // ReqI
              0, // TinyType.TINY_NONE
            ]),
          );
          socket.on('data', (data) => {
            expect(data).toEqual(
              Buffer.from([
                1, // Size / 4
                3, // PacketType.ISP_TINY
                0, // ReqI
                0, // TinyType.TINY_NONE
              ]),
            );
            inSim.disconnect();
            done();
          });
        });

        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });
      }));
  });

  describe('sending and awaiting packets', () => {
    let mitm: ReturnType<typeof Mitm>;

    beforeEach(() => {
      mitm = Mitm();
    });

    it('should send and await an IS_ISM packet', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        mitm.on('connection', (socket) => {
          socket.on('data', (data) => {
            expect(data).toEqual(
              Buffer.from([
                1, // Size / 4
                3, // PacketType.ISP_TINY
                20, // ReqI
                10, // TinyType.TINY_ISM
              ]),
            );
            socket.write(
              new Uint8Array([
                10, // Size / 4
                10, // PacketType.ISP_ISM
                20, // ReqI
                0, // Zero
                1, // Host
                0, // Sp1
                0, // Sp2
                0, // Sp3
                ...stringToBytes('Very Long Server Name Is Longest'), // HName[32]
              ]),
            );
            inSim.disconnect();
          });
        });

        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });

        inSim
          .sendAwait(
            new IS_TINY({
              ReqI: 20,
              SubT: TinyType.TINY_ISM,
            }),
            PacketType.ISP_ISM,
          )
          .then((packet) => {
            expect(packet.ReqI).toEqual(20);
            expect(packet.HName).toEqual('Very Long Server Name Is Longest'); // test2
            done();
          });
      }));

    it('should send and await a ping packet', () =>
      new Promise<void>((done) => {
        const inSim = new InSim();

        mitm.on('connection', (socket) => {
          socket.on('data', (data) => {
            expect(data).toEqual(
              Buffer.from([
                1, // Size / 4
                3, // PacketType.ISP_TINY
                25, // ReqI
                3, // TinyType.TINY_PING
              ]),
            );
            socket.write(
              new Uint8Array([
                1, // Size / 4
                3, // PacketType.ISP_TINY
                25, // ReqI
                4, // TinyType.TINY_REPLY
              ]),
            );
            inSim.disconnect();
          });
        });

        inSim.connect({
          Host: '127.0.0.1',
          Port: 29999,
        });

        inSim
          .sendAwait(
            new IS_TINY({
              ReqI: 25,
              SubT: TinyType.TINY_PING,
            }),
            PacketType.ISP_TINY,
            ({ SubT }) => SubT === TinyType.TINY_REPLY,
          )
          .then((packet) => {
            expect(packet.ReqI).toEqual(25);
            expect(packet.SubT).toEqual(TinyType.TINY_REPLY);
            done();
          });
      }));
  });
});
