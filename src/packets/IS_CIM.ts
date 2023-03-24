import { byte } from '../decorators';
import { Packet } from './base';
import type {
  GarageInterfaceSubmode,
  InterfaceMode,
  NormalInterfaceSubmode,
  ObjectIndex,
  ShiftUInterfaceSubmode,
} from './enums';
import { PacketType } from './enums';

/**
 * Conn Interface Mode
 */
export class IS_CIM extends Packet {
  @byte() readonly Size = 8;
  @byte() readonly Type = PacketType.ISP_CIM;
  @byte() readonly ReqI = 0;

  /** Connection's unique id (0 = local) */
  @byte() UCID = 0;

  /** Mode identifier */
  @byte() Mode: InterfaceMode = 0;

  /** Submode identifier */
  @byte() SubMode:
    | NormalInterfaceSubmode
    | GarageInterfaceSubmode
    | ShiftUInterfaceSubmode = 0;

  /** Selected object type */
  @byte() SelType: ObjectIndex = 0;

  @byte() private readonly Sp3 = 0;
}
