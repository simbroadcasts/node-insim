export interface IReceivable {
  unpack: (
    buffer: Buffer,
    propertyFormatOverrides?: Record<string, string>,
  ) => this;
}
