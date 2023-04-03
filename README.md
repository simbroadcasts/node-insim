# Node InSim

<img src="https://simbroadcasts.tv/assets/node-insim/node-insim-icon-256.png" width="100px" align="right" hspace="15">

[![NPM Version](https://img.shields.io/npm/v/node-insim?style=flat-square)](https://www.npmjs.com/package/node-insim) ![Node.js CI](https://github.com/simbroadcasts/node-insim/actions/workflows/.github/workflows/node.js.yml/badge.svg)

An [InSim](https://en.lfsmanual.net/wiki/InSim.txt) library for Node.js with
TypeScript support.

## Introduction

Node InSim provides a JavaScript API to communicate with the [Live for Speed](https://www.lfs.net/)
InSim protocol over a TCP connection. After connecting to an LFS server via a hostname
and a port, you are able to send InSim packets to the server and receive incoming
packets from the server.

All packet structures in Node InSim are identical to the structs defined in the
[InSim protocol](https://en.lfsmanual.net/wiki/InSim.txt). All packet classes with all
their properties are documented according to the specification.

### InSim compatibility

Node InSim is compatible with InSim version 9.

## Installation

Install the `node-insim` NPM package in your Node.js application:

```shell
npm install --save node-insim
```

or if you use Yarn:

```shell
yarn add node-insim
```

## Usage

### Connecting

To connect to an LFS server, you must enter its hostname, a port and a short name
of your application.

The InSim port must be configured in the LFS server settings. Also, make sure the
public IP address from which your application is connecting is allowed to connect to
the server InSim port.

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

InSim packets can be sent using the `send()` method on the `InSim` class instance,
which takes a single argument - the packet class instance.

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

The `InSim` class exposes an `on()` method, which is used to listen for incoming
packets by their type.

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

The event callback contains the received packet, and an optional second argument - the
`InSim` instance which received that packet. You can use that instance to send
additional packets in response.

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

### String encoding

All strings in received packets are automatically converted from LFS encoding to UTF-8.

If you need to access the raw string, use the `_raw` property in the packet
instance, which contains all unconverted string properties.

```ts
import { InSim } from 'node-insim';
import { PacketType } from 'node-insim/packets';
import type { IS_ISM } from 'node-insim/packets';

const inSim = new InSim();

inSim.on(PacketType.ISP_ISM, (packet: IS_ISM) => {
  console.log(packet.HName); // UTF-8 string - ^1Drifter Team ^7★ Server
  console.log(packet._raw.HName); // raw string - ^1Drifter Team ^7^J Server\u0000\u0000\u0000\u0000
});
```

### InSim Relay

To connect to the InSim Relay service, use the `connectRelay()` method. Once connected,
you can send and receive relay packets. The following example demonstrates how to show a
list of hosts connected to the InSim Relay:

```ts
import { InSim } from 'node-insim';
import { IR_HLR, IR_HOS, PacketType, HInfo } from 'node-insim/packets';

inSim.connectRelay();

inSim.on('connect', () => {
  // Request a list of hosts
  inSim.send(new IR_HLR());
});

inSim.on(PacketType.IRP_HOS, (packet: IR_HOS) => {
  // Log the name of each received host
  packet.Info.forEach((host: HInfo) => {
    console.log(host.HName);
  });
});
```

More information about the InSim Relay protocol can be found in the [InSim Relay client
information](https://www.lfs.net/forum/thread/30740) thread on LFS forum.

### OutGauge

```ts
import { OutGauge, OutGaugePack } from 'node-insim';

const outGauge = new OutGauge();

outGauge.connect({
  Host: '127.0.0.1',
  Port: 29999,
});

outGauge.on('packet', (data: OutGaugePack) => {
  console.clear();
  console.log(data.RPM);
});
```

### OutSim

```ts
import { OutSim, OutSimPack } from 'node-insim';

const outSim = new OutSim();

outSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
});

outSim.on('packet', (data: OutSimPack) => {
  console.clear();
  console.log(data.PosX);
});
```


### Debugging

Node InSim uses the [`debug` NPM package](https://github.com/debug-js/debug) for debug
logs. By default, Node InSim does not output any logs to the standard output.

To enable logging, use the `DEBUG` environment variable when running your InSim
application. All logs are prefixed with `node-insim`. You can use wildcards to filter
out the logs that you need.

```sh
DEBUG=* node insim.js # debug all messages
DEBUG=node-insim:tcp node insim.js # debug only TCP protocol messages
```

## Example applications

In the [`examples/`](./examples) folder, there are example Node.js applications using
Node InSim.

- JavaScript + CommonJS
  - [InSim connection](./examples/insim-connection-js)
  - [InSim Relay](./examples/insim-relay-js)
  - [OutGauge](./examples/outgauge-js)
- TypeScript + ES Modules
  - [InSim connection](./examples/insim-connection-ts)
  - [InSim Relay](./examples/insim-relay-ts)
  - [OutGauge](./examples/outgauge-ts)

Before you run an example, first make sure the local Node InSim package is built by
running `yarn build-local` in the root folder. Then follow the instructions in each
example's `README.md` file.

For instance, to run the "InSim connection - TypeScript" example, run the following
commands:

```shell
yarn build-local
cd examples/insim-connection-ts
yarn
yarn dev
```

## Development

### Requirements

- Node.js 18
- Yarn

### Start a development server

```shell
yarn dev
```

### Code generators

When adding new InSim packets to the library, you can use built-in code generators
using `yarn generate`. It will create and update all the necessary files for you.

### Run unit tests

```shell
yarn test
yarn test:watch
```

### Run tests against a real LFS application

To run these tests, LFS must be running with an InSim port open.

By default, the tests connect to `127.0.0.1:29999`. The InSim host and port can be configured by copying `.env` to `.env.local` in the `lfs-test` directory.

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

---

![Node Insim - An open source project by Sim Broadcasts](https://simbroadcasts.tv/assets/node-insim/node-insim-footer.png)
