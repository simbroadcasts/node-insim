import parseLFSMessage from 'parse-lfs-message';

import { createLog, unpack } from '../utils';
import { getFormat } from './decorators';
import type { IPacket } from './IPacket';
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

  protected getValidPropertyNames(): (keyof this)[] {
    const prototype = Object.getPrototypeOf(this);
    const ownPropertyNames = Object.getOwnPropertyNames(this) as (keyof this)[];
    const prototypePropertyNames = Object.keys(
      Object.getOwnPropertyDescriptors(prototype),
    ) as (keyof this)[];
    return [...ownPropertyNames, ...prototypePropertyNames].filter(
      (propertyName) => getFormat(this, propertyName) !== undefined,
    );
  }

  protected getFormat(propertyFormats?: Record<string, string>): string {
    const propertyNames = this.getValidPropertyNames();
    const format = propertyNames
      .map(
        (propertyName) =>
          propertyFormats?.[propertyName as string] ??
          getFormat(this, propertyName),
      )
      .join('');

    return `<${format}`;
  }

  private unpack(buffer: Buffer): this {
    const propertyNames = this.getValidPropertyNames();
    const data = unpack(this.getFormat(), buffer);

    if (!data) {
      log.warn('Unpacked no data from buffer', buffer);
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
