# node-insim

## 6.7.0

### Minor Changes

- [#115](https://github.com/simbroadcasts/node-insim/pull/115) [`96200aa`](https://github.com/simbroadcasts/node-insim/commit/96200aa8c36ce6e052c14eefd1ba6a7b1eeea50a) Thanks [@mkapal](https://github.com/mkapal)! - Add `IS_SET` packet
  Add `ISF_SET` flag to `InSimFlags`

- [#122](https://github.com/simbroadcasts/node-insim/pull/122) [`8c5fded`](https://github.com/simbroadcasts/node-insim/commit/8c5fdeda849e2666d995e374bf6313ae630a5e9c) Thanks [@mkapal](https://github.com/mkapal)! - Rename `IS_MSO.Zero` to `IS_MSO.MSOData` and add `CodePage` enum for the message's code page (bits 0-3 of `MSOData`)

### Patch Changes

- [#122](https://github.com/simbroadcasts/node-insim/pull/122) [`805ed3c`](https://github.com/simbroadcasts/node-insim/commit/805ed3c33c9c034fbb89183b23b6d53f7e9b1935) Thanks [@mkapal](https://github.com/mkapal)! - Use original code page from `IS_MSO.MSOData` when parsing `IS_MSO.Msg` property with `^8` control characters

## 6.6.0

### Minor Changes

- [`49efc9d`](https://github.com/simbroadcasts/node-insim/commit/49efc9d5766bb011b904d6c3aacfdaea37b6d4bf) Thanks [@mkapal](https://github.com/mkapal)! - Add `IS_BTN.MAX_TEXT_LENGTH` static class property (240)

- [`736c900`](https://github.com/simbroadcasts/node-insim/commit/736c900010cc62ab648c8f4e4aadae90e11207fc) Thanks [@mkapal](https://github.com/mkapal)! - Make `IS_BTN.FIXED_DATA_SIZE` static class property public

### Patch Changes

- [`33d13b9`](https://github.com/simbroadcasts/node-insim/commit/33d13b908b37aa7072acf704b47567571b4e7f78) Thanks [@mkapal](https://github.com/mkapal)! - Fix `PlayerHCap.H_TRes` to use the unsigned `@byte()` decorator instead of signed `@char()`

- [`0eb6f05`](https://github.com/simbroadcasts/node-insim/commit/0eb6f052c4ec819b24a33ec6f6142c70af0c283e) Thanks [@mkapal](https://github.com/mkapal)! - Correct `IS_HLV.Size` (was 16, should be 20)

- [`619034a`](https://github.com/simbroadcasts/node-insim/commit/619034af31fd52a7c9269329b0e4726bb2b66ade) Thanks [@mkapal](https://github.com/mkapal)! - Add the missing `CCI_RETIRED` flag to `CompCarFlags`

- [`41b0d35`](https://github.com/simbroadcasts/node-insim/commit/41b0d35eb40fdae4b4ea0075a690f4d499cf1d85) Thanks [@mkapal](https://github.com/mkapal)! - Fix `IS_REO.PLID` default array length to match `REO_MAX_PLAYERS` (48)

## 6.5.0

### Minor Changes

- [`16eb122`](https://github.com/simbroadcasts/node-insim/commit/16eb122740e6c898101930f74d067889b7939e53) Thanks [@mkapal](https://github.com/mkapal)! - Remove `HInfo` and `HostInfoFlags` from packet structs - discontinued with InSim Relay

### Patch Changes

- [`d1b800d`](https://github.com/simbroadcasts/node-insim/commit/d1b800d8063a247ec0c5631bee53f59aedf61e07) Thanks [@mkapal](https://github.com/mkapal)! - Unpack `IS_RES.CName` property as car name

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
