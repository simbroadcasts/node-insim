export interface Receivable {
  unpack: (
    buffer: Uint8Array,
    propertyFormatOverrides?: Record<string, string>,
  ) => this;
}
