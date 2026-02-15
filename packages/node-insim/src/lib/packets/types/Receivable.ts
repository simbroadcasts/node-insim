export interface Receivable {
  unpack: (
    buffer: Uint8Array<ArrayBuffer>,
    propertyFormatOverrides?: Record<string, string>,
  ) => this;
}
