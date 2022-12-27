# Node InSim

An [InSim](https://en.lfsmanual.net/wiki/InSim.txt) library for Node.js

## Installation

Install the `node-insim` NPM package using Yarn:

```shell
yarn add node-insim
```

or if you use NPM:

```shell
npm install --save node-insim
```

## Usage

### Connecting

```ts
import NodeInSim from 'node-insim';

const inSim = new NodeInSim.InSim();

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  IName: 'Node InSim App',
});
```

### Sending packets

InSim packets can be sent using the `send()` method, which takes a single argument - the packet class instance.

A fast way to set packet properties is to populate them in the class constructor:

```ts
import NodeInSim from 'node-insim';
import { IS_TINY, TinyType } from 'node-insim/packets';

const inSim = new NodeInSim.InSim();

inSim.send(
  new IS_TINY({
    ReqI: 1,
    SubT: TinyType.TINY_PING,
  }),
);
```

Another way is to assign each property after creating the instance:

```ts
import NodeInSim from 'node-insim';
import { IS_TINY, TinyType } from 'node-insim/packets';

const inSim = new NodeInSim.InSim();

const pingPacket = new IS_TINY();
pingPacket.ReqI = 1;
pingPacket.SubT = TinyType.TINY_PING;

inSim.send(pingPacket);
```

### Receiving packets

The `InSim` class is an [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter), which means you can attach event listeners to various events, including incoming packets.

```ts
import NodeInSim from 'node-insim';
import type { IS_VER } from 'node-insim/packets';
import { PacketType } from 'node-insim/packets';

const inSim = new NodeInSim.InSim();

inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: IS_VER) {
  console.log(`Connected to LFS ${packet.product} ${packet.Version}`);
}
```

The `on()` event listener takes an optional second argument - the `InSim` instance which received that packet. You can use that instance to send additional packets in response.

```ts
import NodeInSim from 'node-insim';
import { PacketType } from 'node-insim/packets';
import type { InSim, IS_VER } from 'node-insim/protocols';

const inSim = new NodeInSim.InSim();

inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: IS_VER, inSim: InSim) {
  inSim.send(
    new IS_TINY({
      ReqI: 1,
      SubT: TinyType.TINY_PING,
    }),
  );
}
```

## Development

### Requirements

- Node.js 16
- Yarn

### Start a development server

```shell
yarn dev
```

### Code generators

When adding new InSim packets to the library, you can use built-in code generators using `yarn generate`. It will create and update all the necessary files for you.

### Run tests

```shell
yarn test
yarn test:watch
```

### Lint code

```shell
yarn lint
```

### Format code

```shell
yarn format
```

### Production build

Compiled files will be created in `dist/`.

```shell
yarn build
```

### Publish NPM package

```shell
yarn dist
```
