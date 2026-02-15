import { byte } from '../decorators';
import { Packet } from './base';
import type { ObjectIndex } from './enums';
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

export enum InterfaceMode {
  /** Not in a special mode */
  CIM_NORMAL,

  /** In the options menu */
  CIM_OPTIONS,

  /** In the host's options menu */
  CIM_HOST_OPTIONS,

  /** In the garage */
  CIM_GARAGE,

  /** In the car selection menu */
  CIM_CAR_SELECT,

  /** In the track selection menu */
  CIM_TRACK_SELECT,

  /** In the free view mode (SHIT + U) */
  CIM_SHIFTU,
}

export enum GarageInterfaceSubmode {
  /** Info tab */
  GRG_INFO,

  /** Colours tab */
  GRG_COLOURS,

  /** Brakes / TC tab */
  GRG_BRAKE_TC,

  /** Suspension tab */
  GRG_SUSP,

  /** Steering tab */
  GRG_STEER,

  /** Final Drive tab */
  GRG_DRIVE,

  /** Tyres tab */
  GRG_TYRES,

  /** Downforce tab */
  GRG_AERO,

  /** Undocumented */
  GRG_PASS,
}

export enum NormalInterfaceSubmode {
  /** Not in a specific view */
  NRM_NORMAL,

  /** User is viewing the car's wheel temperature (F9) */
  NRM_WHEEL_TEMPS,

  /** User is viewing the car's wheel damage (F10) */
  NRM_WHEEL_DAMAGE,

  /** User is viewing the setting pane for the car (F11) */
  NRM_LIVE_SETTINGS,

  /** User is viewing the pit instructions pane (F12) */
  NRM_PIT_INSTRUCTIONS,
}

export enum ShiftUInterfaceSubmode {
  /** No buttons displayed */
  FVM_PLAIN,

  /** Buttons displayed (not editing) */
  FVM_BUTTONS,

  /** Edit mode */
  FVM_EDIT,
}
