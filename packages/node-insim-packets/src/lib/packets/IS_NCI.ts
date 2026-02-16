import { Packet } from '../base/index.js';
import { byte, unsigned } from '../decorators.js';
import { PacketType } from '../enums/index.js';

/**
 * New Conn Info - sent on host only if an admin password has been set
 */
export class IS_NCI extends Packet {
  @byte() readonly Size = 16;
  @byte() readonly Type = PacketType.ISP_NCI;

  /** 0 unless this is a reply to a {@link TINY_NCI} request */
  @byte() ReqI = 0;

  /** Connection's unique id (0 = host) */
  @byte() UCID = 0;

  /** Languages */
  @byte() Language: Language = 0;

  /** 0:demo / 1:S1 ... */
  @byte() License: License = 0;

  @byte() private readonly Sp2 = 0;
  @byte() private readonly Sp3 = 0;

  /** LFS UserID */
  @unsigned() UserID = 0;

  /** IP address formatted as 255.255.255.255 */
  @unsigned() IPAddress = '';

  override unpack(buffer: Uint8Array<ArrayBuffer>): this {
    super.unpack(buffer);

    this.IPAddress = buffer.slice(12, 16).join('.');

    return this;
  }
}

export enum Language {
  LFS_ENGLISH,
  LFS_DEUTSCH,
  LFS_PORTUGUESE,
  LFS_FRENCH,
  LFS_SUOMI,
  LFS_NORSK,
  LFS_NEDERLANDS,
  LFS_CATALAN,
  LFS_TURKISH,
  LFS_CASTELLANO,
  LFS_ITALIANO,
  LFS_DANSK,
  LFS_CZECH,
  LFS_RUSSIAN,
  LFS_ESTONIAN,
  LFS_SERBIAN,
  LFS_GREEK,
  LFS_POLSKI,
  LFS_CROATIAN,
  LFS_HUNGARIAN,
  LFS_BRAZILIAN,
  LFS_SWEDISH,
  LFS_SLOVAK,
  LFS_GALEGO,
  LFS_SLOVENSKI,
  LFS_BELARUSSIAN,
  LFS_LATVIAN,
  LFS_LITHUANIAN,
  LFS_TRADITIONAL_CHINESE,
  LFS_SIMPLIFIED_CHINESE,
  LFS_JAPANESE,
  LFS_KOREAN,
  LFS_BULGARIAN,
  LFS_LATINO,
  LFS_UKRAINIAN,
  LFS_INDONESIAN,
  LFS_ROMANIAN,
}

export enum License {
  Demo,
  S1,
  S2,
  S3,
}
