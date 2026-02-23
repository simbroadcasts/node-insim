# node-insim

## 6.3.0

### Minor Changes

- [`acd6e6d`](https://github.com/simbroadcasts/node-insim/commit/acd6e6d8e762183f9e72fc1ff54c8e68ac543dc2) Thanks [@mkapal](https://github.com/mkapal)! - Add `DLF_ENGINE_SEVERE` into `DashLights` enum

- [`1e5c5f9`](https://github.com/simbroadcasts/node-insim/commit/1e5c5f974073f68da550f3b61850bed6b1e7f0ec) Thanks [@mkapal](https://github.com/mkapal)! - Add `RaceFlags` enum values from 1024 to 32768

  New flags:

  - `RaceFlags.HOSTF_SHOW_FUEL` - Remote cars fuel visible
  - `RaceFlags.HOSTF_CAN_REFUEL` - Refuelling allowed
  - `RaceFlags.HOSTF_ALLOW_MODS` - Allow vehicle mods
  - `RaceFlags.HOSTF_UNAPPROVED` - Allow unapproved mods
  - `RaceFlags.HOSTF_TEAMARROWS` - Arrows on non-race small map use name colour
  - `RaceFlags.HOSTF_NO_FLOOD` - Floodlights off

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
