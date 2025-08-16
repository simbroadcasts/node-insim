# Node InSim

<img src="https://simbroadcasts.tv/assets/node-insim/node-insim-icon-256.png" width="100px" align="right" hspace="15">

[![NPM Version](https://img.shields.io/npm/v/node-insim?style=flat-square)](https://www.npmjs.com/package/node-insim) ![Node.js CI](https://github.com/simbroadcasts/node-insim/actions/workflows/.github/workflows/validate.yml/badge.svg) [![cov](https://simbroadcasts.github.io/node-insim/badges/coverage.svg)](https://github.com/simbroadcasts/node-insim/actions)

An [InSim](https://en.lfsmanual.net/wiki/InSim.txt) library for Node.js with
TypeScript support.

## Introduction

Node InSim provides a JavaScript API to communicate with the [Live for Speed](https://www.lfs.net/)
InSim protocol over a TCP connection. After connecting to an LFS host via a hostname
and a port, you are able to send InSim packets to the host and receive incoming
packets from the host.

All packet structures in Node InSim are identical to the structs defined in the
[InSim protocol](https://en.lfsmanual.net/wiki/InSim.txt). All packet classes with all their properties are documented
according to the specification.

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

## Documentation

For more detailed documentation of the public API, see https://simbroadcasts.github.io/node-insim/.

## Usage

### Connecting

To connect to an LFS host, you must enter its hostname, a port and a short name of
your InSim application.

The InSim port must be configured in the LFS host settings. Also, make sure the public
IP address from which your application is connecting is allowed to connect to the host's
InSim port.

#### Single host

```ts
import { InSim } from 'node-insim';

const inSim = new InSim();

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  IName: 'Node InSim App',
});
```

#### Multiple hosts

To connect to multiple hosts at once, create a new `InSim` instance for each host.

```ts
import { InSim } from 'node-insim';

const inSim1 = new InSim();

inSim1.connect({
  Host: '127.0.0.1',
  Port: 29999,
  IName: 'Node InSim App',
});

const inSim2 = new InSim();

inSim2.connect({
  Host: '127.0.0.2',
  Port: 30000,
  IName: 'Node InSim App',
});
```

#### TCP / UDP

By default, Node InSim opens a TCP connection. If you want to use UDP,
set the `Protocol` option to `UDP` in the `connect` function.

```ts
import { InSim } from 'node-insim';

const inSim = new InSim();

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  IName: 'Node InSim App',
  Protocol: 'UDP',
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

### Waiting for packets

There are cases when you want to send a packet and then wait for a response in another packet. There is a helper method `sendAwait()` which waits for a given packet type and when it's received, it's resolved as a Promise. It also makes sure that the received packet's `ReqI` property matches the one entered in the sent packet.

```ts
import { InSim } from 'node-insim';
import { IS_TINY, PacketType, TinyType } from 'node-insim/packets';

const inSim = new InSim();

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  IName: 'Node InSim App',
});

inSim
  .sendAwait(
    new IS_TINY({
      ReqI: 1,
      SubT: TinyType.TINY_SST,
    }),
    PacketType.ISP_STA,
  )
  .then((packet) => {
    console.log(packet.NumConns);
  });
```

You can filter the received packet by its data using a callback in the 3rd argument:

```ts
import { InSim } from 'node-insim';
import { IS_TINY, PacketType, TinyType } from 'node-insim/packets';

const inSim = new InSim();

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  IName: 'Node InSim App',
});

inSim
  .sendAwait(
    new IS_TINY({
      ReqI: 1,
      SubT: TinyType.TINY_GTH,
    }),
    PacketType.ISP_SMALL,
    ({ SubT }) => SubT === SmallType.SMALL_RTP,
  )
  .then((packet) => {
    console.log('session time', packet.UVal);
  });
```

#### Request-reply packet pairs

| Name         | Request packet                            | Reply packet                                |
| ------------ | ----------------------------------------- | ------------------------------------------- |
| Ping         | `IS_TINY`<br />SubT: `TinyType.TINY_PING` | `IS_TINY`<br />SubT: `TinyType.TINY_REPLY`  |
| Session time | `IS_TINY`<br />SubT: `TinyType.TINY_GTH`  | `IS_SMALL`<br />SubT: `SmallType.SMALL_RTP` |
| State        | `IS_TINY`<br />SubT: `TinyType.TINY_SST`  | `IS_STA`                                    |
| InSim multi  | `TINY_ISM`                                | `IS_ISM`                                    |

### Sending messages

The `InSim` class has helper methods useful for sending messages to LFS.

#### Send a message which will appear on the local computer only

```ts
inSim.sendLocalMessage('Local message');
```

#### Send a command

```ts
inSim.sendMessage('/end');
```

#### Send a message

- up to 63 characters - send an `IS_MST` packet
- 64 characters or more - send an `IS_MSX` packet

```ts
inSim.sendMessage('This is a message');
```

#### Send a message to a specific connection by their UCID

```ts
inSim.sendMessageToConnection(4, 'This is a message targeting UCID 4');
```

#### Send a message to a specific player by their PLID

```ts
inSim.sendMessageToPlayer(4, 'This is a message targeting PLID 4');
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

#### Multiple hosts

You can use the `inSim` argument in the event handler callback to identify the source
host of the received packets, for instance by the `options.Host` property.

Alternatively, the `InSim` class constructor accepts an optional `id` argument, which
can also be used to tell apart the InSim connections.

```ts
import { InSim } from 'node-insim';

const inSim1 = new InSim('Host One');

inSim1.connect({
  Host: '127.0.0.1',
  Port: 29999,
  IName: 'Node InSim App',
});

const inSim2 = new InSim('Host Two');

inSim2.connect({
  Host: '127.0.0.2',
  Port: 30000,
  IName: 'Node InSim App',
});

inSim1.on(PacketType.ISP_VER, onVersion);
inSim2.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: IS_VER, inSim: InSim) {
  console.log(`Connected to ${inSim.options.Host}:${inSim.options.Port}`);

  if (inSim.id) {
    console.log(`InSim connection ID: ${inSim.id}`);
  }
}
```

### String encoding

All strings in received or sent packets are automatically converted from LFS encoding to
Unicode and vice versa.

If you need to access the raw LFS-encoded string in a received packet, use the `_raw`
property in the packet instance, which contains all unconverted string properties.

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

When you send a Unicode string value in a packet, each character will get encoded into
the correct LFS encoding, so LFS can display the text in a message or a button.

```ts
import { InSim } from 'node-insim';
import { PacketType } from 'node-insim/packets';
import type { IS_MSL } from 'node-insim/packets';

const inSim = new InSim();

inSim.on(PacketType.ISP_VER, (packet: IS_VER) => {
  inSim.send(
    new IS_MSL({
      Msg: 'čau světe', // LFS will receive: ^Eèau svìte
    }),
  );
});
```

#### Special characters

Special care needs to be taken when sending strings containing caret (`^`) and slash (`/`) characters:

- A caret needs to be escaped as `^^` because the caret symbol acts as an escape character in LFS. Sending `^^hello` as a message will display `^hello` in LFS. Sending just `^hello` would appear as `#ello`.
- A slash needs to be escaped as `^s`, otherwise it is treated as an LFS in-game command prefix when used in a message packet. Sending `^sjoin` as a message will display `/join` in LFS, whereas sending `/join` will make the player join the track.

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

outSim.on('packet', (data) => {
  // Make sure the simple OutSimPack packet is really received, as opposed to OutSimPack2
  if (!(data instanceof OutSimPack)) {
    return;
  }

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

You can find example applications using Node InSim in the [examples](./examples) folder.

| Example                           |                                                                |                                                                |
| --------------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| InSim connection                  | [JavaScript + CJS](./examples/javascript/insim-connection)     | [TypeScript + ESM](./examples/typescript/insim-connection)     |
| InSim connection (multiple hosts) | [JavaScript + CJS](./examples/javascript/insim-multiple-hosts) | [TypeScript + ESM](./examples/typescript/insim-multiple-hosts) |
| InSim connection (UDP)            | [JavaScript + CJS](./examples/javascript/insim-connection-udp) | [TypeScript + ESM](./examples/typescript/insim-connection-udp) |
| OutGauge                          | [JavaScript + CJS](./examples/javascript/outgauge)             | [TypeScript + ESM](./examples/typescript/outgauge)             |
| OutGauge with InSim buttons       | [JavaScript + CJS](./examples/javascript/outgauge-buttons)     | [TypeScript + ESM](./examples/typescript/outgauge-buttons)     |
| OutSim                            | [JavaScript + CJS](./examples/javascript/outsim-basic)         | [TypeScript + ESM](./examples/typescript/outsim-basic)         |
| OutSim with Options               | [JavaScript + CJS](./examples/javascript/outsim-advanced)      | [TypeScript + ESM](./examples/typescript/outsim-advanced)      |

Before you run an example, follow the instructions in each example's `README.md` file.

For instance, to run the "InSim connection - TypeScript" example, run the following
commands:

```shell
cd examples/typescript/insim-connection
npm install
npm start
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
```

### Run tests against a real LFS application

To run these tests, LFS must be running with an InSim port open.

By default, the tests connect to `127.0.0.1:29999`. The InSim host and port can be configured by copying `.env` to `.env.local` in the `lfs-test` directory.

```shell
yarn test:lfs
```

### Build all example applications

This command will go through each application in the `examples/` folder,
install its dependencies, then build the application (typescript only).

```shell
yarn test:examples
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

### Run all checks at once

You can run code format, lint + fix, build and test with the following command:

```shell
yarn check-all
```

---

![Node Insim - An open source project by Sim Broadcasts](https://simbroadcasts.tv/assets/node-insim/node-insim-footer.png)
