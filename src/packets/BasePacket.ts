import parseLFSMessage from 'parse-lfs-message';

import { unpack } from '../utils/jspack';
import { createLog } from '../utils/log';
import { getFormat } from './decorators';
import { IPacket } from './IPacket';
import { PacketType } from './packetTypes';

const log = createLog('BasePacket');

type Data = Record<string, unknown>;

export abstract class BasePacket implements IPacket {
  static readonly SIZE_MULTIPLIER = 4;

  abstract Size: number;
  abstract Type: PacketType;
  abstract ReqI: number;

  protected initialize(data?: Partial<Data> | Buffer) {
    if (!data) {
      return;
    }

    if (data instanceof Buffer) {
      this.unpack(data);
      return;
    }

    Object.assign(this, data);
  }

  protected getValidPropertyNames() {
    return Object.getOwnPropertyNames(this).filter(
      (propertyName) => getFormat(this, propertyName) !== undefined,
    );
  }

  protected get format() {
    const propertyNames = this.getValidPropertyNames();
    const format = propertyNames
      .map((propertyName) => getFormat(this, propertyName))
      .join('');

    return `<${format}`;
  }

  private unpack(buffer: Buffer): this {
    const propertyNames = this.getValidPropertyNames();
    const data = unpack(this.format, buffer);

    if (!data) {
      log.debug('Unpacked no data from buffer', buffer);
      return this;
    }

    propertyNames.forEach((propertyName, i) => {
      let value = data[i];

      if (typeof value === 'string' && value.length > 0) {
        value = parseLFSMessage(value);
      }

      if (propertyName === 'Size') {
        (this[propertyName] as unknown as number) =
          value * BasePacket.SIZE_MULTIPLIER;
        return;
      }

      this[propertyName as unknown as Extract<keyof this, string>] = value;
    });

    log.info('Packet received:', PacketType[this.Type]);
    log.debug('Packet received:', this);

    return this;
  }
}
