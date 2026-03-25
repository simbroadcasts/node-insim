---
'node-insim': minor
---

Add `RIFlags` property and `SAIType` getter to IS_NPL packet

- `RIFlags` contains racer info flags about whether a player joined after the race has started (`RIF_LATE_START`), or if it is an unmovable object without collision (`RIF_SAI_NON_SOLID`). The flags are available in a new enum `RacerInfoFlags`.
- `SAIType` is a derived value from `RIFlags` and returns the resulting `SAIType` enum value (movable, unmovable floating, unmovable at ground level, unmovable at ground angle).
