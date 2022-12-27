import { byte, log as baseLog, string } from '../utils';
import { AbstractSendablePacket } from './AbstractSendablePacket';
import type { ScreenshotError } from './enums';
import { PacketType } from './enums';
import type { PacketDataWithRequiredReqI } from './types';

const logError = baseLog.extend('IS_SSH:error');

/**
 * ScreenSHot
 *
 * You can instruct LFS to save a screenshot in data\shots using the IS_SSH packet.
 *
 * It will be saved as bmp / jpg / png as set in Misc Options.
 * Name can be a filename (excluding extension) or zero - LFS will create a name.
 *
 * LFS will reply with another IS_SSH when the request is completed.
 */
export class IS_SSH extends AbstractSendablePacket {
  @byte() readonly Size = 40;
  @byte() readonly Type = PacketType.ISP_SSH;

  /** Request: non-zero / reply: same value returned */
  @byte() ReqI = 0;

  /** 0 = OK / other values see {@link ScreenshotError} */
  @byte() Error: ScreenshotError = 0;

  @byte() readonly Sp0 = 0;
  @byte() readonly Sp1 = 0;
  @byte() readonly Sp2 = 0;
  @byte() readonly Sp3 = 0;

  /** Name of screenshot file - last byte must be zero */
  @string(32) Name = '';

  constructor(data?: IS_SSH_Data) {
    super();
    this.initialize(data);
  }

  pack(): Buffer {
    if (this.ReqI === 0) {
      logError('ReqI must be greater than 0');
    }

    return super.pack();
  }
}

export type IS_SSH_Data = Omit<PacketDataWithRequiredReqI<IS_SSH>, 'Error'>;
