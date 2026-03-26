# node-insim

## 6.4.0

### Minor Changes

- [#96](https://github.com/simbroadcasts/node-insim/pull/96) [`517c2f6`](https://github.com/simbroadcasts/node-insim/commit/517c2f6106edb38847b19ba7fe25a3ae17bb6d5c) Thanks [@mkapal](https://github.com/mkapal)! - Increase `IS_NLP.NLP_MAX_CARS` to 48

- [#96](https://github.com/simbroadcasts/node-insim/pull/96) [`0b3f64a`](https://github.com/simbroadcasts/node-insim/commit/0b3f64a818cc676d071ab259e235553db4e7c733) Thanks [@mkapal](https://github.com/mkapal)! - Add `RIFlags` property and `SAIType` getter to IS_NPL packet

  - `RIFlags` contains racer info flags about whether a player joined after the race has started (`RIF_LATE_START`), or if it is an unmovable object without collision (`RIF_SAI_NON_SOLID`). The flags are available in a new enum `RacerInfoFlags`.
  - `SAIType` is a derived value from `RIFlags` and returns the resulting `SAIType` enum value (movable, unmovable floating, unmovable at ground level, unmovable at ground angle).

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
