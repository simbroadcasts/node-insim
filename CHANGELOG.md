# node-insim

## 6.2.0

### Minor Changes

- [`74b9dd5`](https://github.com/simbroadcasts/node-insim/commit/74b9dd52e10a5fef3929ae30a020ec911baf01f0) Thanks [@mkapal](https://github.com/mkapal)! - Emit an 'error' event on InSim error

  Usage:

  ```ts
  inSim.on('error', (error) => {
    console.error('InSim error:', error);
  });
  ```

## 6.1.0

### Minor Changes

- [#84](https://github.com/simbroadcasts/node-insim/pull/84) [`cd1337a`](https://github.com/simbroadcasts/node-insim/commit/cd1337a1afa89872b84aed78ff3b48cebb380672) Thanks [@mkapal](https://github.com/mkapal)! - Add `ObjectFlags` enum with `FLOATING` value (0x80)
