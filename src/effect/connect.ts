import { NodeSocket } from '@effect/platform-node';
import { Schema } from '@effect/schema';
import { Effect, Queue, Ref } from 'effect';

import { InSim } from '../InSim';
import { copyBuffer } from '../lfspack';
import { IS_ISI, IS_ISI_ReqI, PacketType } from '../packets';
import { IS_TINY_Transform } from './schema';

// const config = Config.map(
//   Config.all([Config.string('HOST'), Config.number('PORT')]),
//   ([host, port]) => ({ host, port }),
// );

const PACKET_SIZE_MULTIPLIER = 4;

const program = Effect.gen(function* () {
  yield* Effect.log('Connecting to LFS');
  // const hostPort = yield* config;
  const socket = yield* NodeSocket.makeNet({
    host: '188.122.74.155',
    port: 52317,
  });
  const send = yield* socket.writer;

  const initPacket = new IS_ISI({
    IName: 'Effect',
    Admin: 'test<password',
    InSimVer: InSim.INSIM_VERSION,
    ReqI: IS_ISI_ReqI.SEND_VERSION,
  });
  yield* Effect.log('Sending initialization packet');
  yield* send(initPacket.pack());

  const tempBufferRef = yield* Ref.make<Uint8Array>(new Uint8Array(0));
  const packetBufferQueue = yield* Queue.unbounded<Uint8Array>();

  const processTempBuffer: Effect.Effect<void, never, never> = Effect.gen(
    function* () {
      const tempBuffer = yield* Ref.get<Uint8Array>(tempBufferRef);

      if (tempBuffer.length < 4) {
        yield* Effect.log(
          `Haven't received a full 32 bit header yet: ${tempBuffer.join()}`,
        );

        return;
      }

      const size = tempBuffer[0] * PACKET_SIZE_MULTIPLIER;

      if (tempBuffer.length < size) {
        yield* Effect.log(`Received incomplete packet: ${tempBuffer.join()}`);
        return;
      }

      const packetBuffer = copyBuffer(tempBuffer.slice(0, size));

      if (tempBuffer.length > size) {
        yield* Effect.log(`Process first packet: ${packetBuffer.join()}`);
        yield* Ref.set(
          tempBufferRef,
          tempBuffer.slice(size, tempBuffer.length),
        );
        yield* processTempBuffer;
        return;
      }

      yield* Effect.log(`Received one full packet: ${packetBuffer.join()}`);
      yield* Queue.offer(packetBufferQueue, packetBuffer);
      yield* Ref.set(tempBufferRef, new Uint8Array(0));
    },
  );

  yield* Effect.fork(
    socket.run((data) =>
      Effect.gen(function* () {
        yield* Effect.log('Data received');
        yield* Ref.update(
          tempBufferRef,
          (buffer) => new Uint8Array([...buffer, ...data]),
        );
        yield* processTempBuffer;
      }),
    ),
  );

  const processPacketQueue = Effect.gen(function* () {
    yield* Effect.log('Waiting for a packet to process');
    const packetBuffer: Uint8Array = yield* Queue.take(packetBufferQueue);

    const packetType = packetBuffer[1] as PacketType;
    const packetTypeString = PacketType[packetType];

    if (packetTypeString === undefined) {
      yield* Effect.log(`Unknown packet type received: ${packetType}`);
      return;
    }

    // const decode = Schema.decodeSync(IS_TINY_Transform, {
    //   onExcessProperty: 'error',
    // });
    //
    // const packetInstance = decode(packetBuffer);

    yield* Effect.log(
      `Packet received: ${packetTypeString} (${packetType})`,
      // packetInstance,
    );
  });

  while (true) {
    yield* processPacketQueue;
  }
});

// const ConfigMock = Layer.setConfigProvider(
//   ConfigProvider.fromMap(
//     new Map([
//       ['HOST', '188.122.74.155'],
//       ['PORT', '52317'],
//     ]),
//   ),
// );

// Effect.runPromise(Effect.provide(Effect.scoped(program), ConfigMock)).then(
//   console.log,
//   console.error,
// );

Effect.runPromise(Effect.scoped(program)).then(console.log, console.error);
