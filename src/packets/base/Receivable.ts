export interface Receivable {
  unpack: (
    buffer: Buffer,
    propertyFormatOverrides?: Record<string, string>,
  ) => this;
}
