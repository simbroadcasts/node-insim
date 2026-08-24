# Node InSim

Node InSim is a Node.js/TypeScript client library for the [Live for Speed](https://www.lfs.net/) InSim protocol. It opens a TCP or UDP socket to an LFS host and lets applications send/receive InSim packets
as typed classes. Packet wire formats mirror the structs defined in InSim.txt (see [`reference/InSim.h`](./reference/InSim.h), the
canonical C header used as source-of-truth when adding/checking packets).

## Commands

All available commands are in package.json scripts.

- Use `yarn check-all` before considering a change complete
- A single vitest test file can also be run directly with `yarn test:compile && npx vitest run path/to/File.test.ts`.

## Adding a new InSim packet

Don't hand-write new packet files — use the Plop generator: `yarn generate` (generator name `packet`). It prompts
for the packet name (without `IS_` prefix), type number, size, and whether it's sendable/receivable/both, then:

1. Creates `src/packets/IS_<NAME>.ts` from `generators/packet.hbs`
2. Creates `src/packets/IS_<NAME>.test.ts` from `generators/packet-test.hbs`
3. Appends an export to `src/packets/index.ts`
4. Appends a placeholder entry to the `PacketType` enum in `src/packets/enums/PacketType.ts` (you must manually move this TODO entry to the correct numeric position matching InSim.txt/InSim.h)

After generating, fill in the packet's properties (as decorated class fields, see below), JSDoc them against
`reference/InSim.h`, and write real fixture-based tests using the helpers in `src/tests.ts`.

## Architecture

### Packet definition via decorators

Every packet is a class in `src/packets/IS_<NAME>.ts` extending one of the base classes in `src/packets/base/`:

- `Struct` — base with reflect-metadata-driven (de)serialization; not a full packet
- `Packet` — abstract base with `Size` / `Type` / `ReqI`, implements `Receivable`
- `SendablePacket` — adds `pack()`, used by packets the client can send
- `SendableStruct` — for structs embedded as repeated/array fields inside other packets (e.g. car info blocks)

Each binary field is declared as a class property annotated with a decorator from `src/decorators.ts`. Property declaration order matters — it determines wire order — and must match InSim.h exactly.

Packets with variable-length data (e.g. `IS_BTN` text, `IS_MST` messages) override `pack()` to compute `Size`
dynamically and pass `propertyFormatOverrides` to `super.pack()` to resize the variable field's format string
at pack time.

## Conventions

- Commits follow Conventional Commits enforced by commitlint, see `commitlint.config.js`
- Releases are managed with Changesets (`yarn changeset` to add one,. Add a changeset for any user-facing change to the published package.
- Public packet/property additions should be documented with JSDoc that cross-references related packets/enums
  using `{@link X}`, matching the existing style (see `IS_BTN.ts`) — this feeds the published TypeDoc API docs.
