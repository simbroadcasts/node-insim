# Node InSim

[![NPM Version](https://img.shields.io/npm/v/node-insim?style=flat-square)](https://www.npmjs.com/package/node-insim)

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
import { InSim } from 'node-insim';

const inSim = new InSim();

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  IName: 'Node InSim App',
});
```

### Sending packets

InSim packets can be sent using the `send()` method on the `InSim` class instance, which takes a single argument - the packet class instance.

A fast way to set packet properties is to populate them in the class constructor:

```ts
import { InSim } from 'node-insim';
import { IS_TINY, TinyType } from 'node-insim/packets';

const inSim = new InSim();

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  IName: 'Node InSim App',
});

inSim.send(
  new IS_TINY({
    ReqI: 1,
    SubT: TinyType.TINY_PING,
  }),
);
```

Another way is to assign each property after creating the instance:

```ts
import { InSim } from 'node-insim';
import { IS_TINY, TinyType } from 'node-insim/packets';

const inSim = new InSim();

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  IName: 'Node InSim App',
});

const pingPacket = new IS_TINY();
pingPacket.ReqI = 1;
pingPacket.SubT = TinyType.TINY_PING;

inSim.send(pingPacket);
```

### Receiving packets

The `InSim` class is an [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter), which means you can attach event listeners to various events, including incoming packets.

```ts
import { InSim } from 'node-insim';
import type { IS_VER } from 'node-insim/packets';
import { PacketType } from 'node-insim/packets';

const inSim = new InSim();

inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: IS_VER) {
  console.log(`Connected to LFS ${packet.product} ${packet.Version}`);
}
```

The `on()` event listener takes an optional second argument - the `InSim` instance which received that packet. You can use that instance to send additional packets in response.

```ts
import { InSim } from 'node-insim';
import { PacketType } from 'node-insim/packets';
import type { IS_VER } from 'node-insim/packets';

const inSim = new InSim();

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

### Example Applications

In the [`examples/`](./examples) 
folder, there are example Node.js applications using Node InSim. To run an example, the 
instructions 
in each example's `README.md` file.

#### Examples:

- JavaScript + CommonJS
    - [InSim connection](./examples/insim-connection-javascript-cjs)
- TypeScript + ES Modules
  - [InSim connection](./examples/insim-connection-typescript-esm)

### Debugging

Node InSim uses the [`debug` NPM package](https://github.com/debug-js/debug) for debug logs. By default, Node InSim does not output any logs to the standard output.

To enable logging, use the `DEBUG` environment variable when running your InSim application. All logs are prefixed with `node-insim`. You can use wildcards to filter out the logs that you need.

```sh
DEBUG=* node insim.js # debug all messages
DEBUG=node-insim:tcp node insim.js # debug only TCP protocol messages
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

### Run unit tests

```shell
yarn test
yarn test:watch
```

### Run tests against a real LFS application

To run these tests, LFS must be running with an InSim port open.

By default, the tests connect to `127.0.0.1:29999`. The InSim host and port can be configured by going to the `lfs-test` folder and copying `.env` to `.env.local`.

```shell
yarn test:lfs
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

### Bump package version

```shell
yarn bump # patch by default
yarn bump patch
yarn bump minor
yarn bump major
yarn bump 1.2.3
```
