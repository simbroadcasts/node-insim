import { testInstructionPacket } from '../tests';
import { PacketType } from './enums';
import {
  AICGear,
  AICHeadlights,
  AICIndicators,
  AICInput,
  AICLook,
  AICSteering,
  AICToggleValue,
  AIInputVal,
  IS_AIC,
} from './IS_AIC';

describe('IS_AIC', () => {
  describe('no inputs', () => {
    testInstructionPacket({
      packetClass: IS_AIC,
      size: 4, // Default size without dynamic data
      type: PacketType.ISP_AIC,
      data: {
        ReqI: 1,
        PLID: 2,
      },
      buffer: new Uint8Array([
        4 / new IS_AIC().SIZE_MULTIPLIER, // Size
        68, // Type
        1, // ReqI
        2, // PLID
      ]),
    });
  });

  describe('all inputs', () => {
    testInstructionPacket({
      packetClass: IS_AIC,
      size: 4, // Default size without dynamic data
      type: PacketType.ISP_AIC,
      data: {
        ReqI: 1,
        PLID: 2,
        Inputs: [
          new AIInputVal({
            Input: AICInput.CS_MSX,
            Value: AICSteering.CENTRE,
          }),
          new AIInputVal({
            Input: AICInput.CS_THROTTLE,
            Value: 1,
          }),
          new AIInputVal({
            Input: AICInput.CS_BRAKE,
            Value: 1,
          }),
          new AIInputVal({
            Input: AICInput.CS_CHUP,
            Time: 50,
            Value: 1,
          }),
          new AIInputVal({
            Input: AICInput.CS_CHDN,
            Time: 50,
            Value: 1,
          }),
          new AIInputVal({
            Input: AICInput.CS_IGNITION,
            Value: AICToggleValue.TOGGLE,
          }),
          new AIInputVal({
            Input: AICInput.CS_EXTRALIGHT,
            Value: AICToggleValue.SWITCH_ON,
          }),
          new AIInputVal({
            Input: AICInput.CS_HEADLIGHTS,
            Time: 1000,
            Value: AICHeadlights.HIGH,
          }),
          new AIInputVal({
            Input: AICInput.CS_SIREN,
            Value: 1,
          }),
          new AIInputVal({
            Input: AICInput.CS_HORN,
            Time: 20,
            Value: 5,
          }),
          new AIInputVal({
            Input: AICInput.CS_FLASH,
            Time: 40,
            Value: 0,
          }),
          new AIInputVal({
            Input: AICInput.CS_CLUTCH,
            Value: 200,
          }),
          new AIInputVal({
            Input: AICInput.CS_HANDBRAKE,
            Value: 400,
          }),
          new AIInputVal({
            Input: AICInput.CS_INDICATORS,
            Value: AICIndicators.RIGHT,
          }),
          new AIInputVal({
            Input: AICInput.CS_GEAR,
            Time: 200,
            Value: AICGear.FOURTH,
          }),
          new AIInputVal({
            Input: AICInput.CS_LOOK,
            Value: AICLook.LEFT_PLUS,
          }),
          new AIInputVal({
            Input: AICInput.CS_PITSPEED,
            Value: AICToggleValue.SWITCH_ON,
          }),
          new AIInputVal({
            Input: AICInput.CS_TCDISABLE,
            Value: AICToggleValue.SWITCH_OFF,
          }),
          new AIInputVal({
            Input: AICInput.CS_FOGREAR,
            Time: 600,
            Value: AICToggleValue.SWITCH_ON,
          }),
          new AIInputVal({
            Input: AICInput.CS_FOGFRONT,
            Time: 60,
            Value: AICToggleValue.SWITCH_ON,
          }),
        ],
      },
      buffer: new Uint8Array([
        84 / new IS_AIC().SIZE_MULTIPLIER, // Size
        68, // Type
        1, // ReqI
        2, // PLID
        0, // Inputs[0] - Input
        0, // Inputs[0] - Time
        0, // Inputs[0] - Value (1)
        128, // Inputs[0] - Value (2)
        1, // Inputs[1] - Input
        0, // Inputs[1] - Time
        1, // Inputs[1] - Value (1)
        0, // Inputs[1] - Value (2)
        2, // Inputs[2] - Input
        0, // Inputs[2] - Time
        1, // Inputs[2] - Value (1)
        0, // Inputs[2] - Value (2)
        3, // Inputs[3] - Input
        50, // Inputs[3] - Time
        1, // Inputs[3] - Value (1)
        0, // Inputs[3] - Value (2)
        4, // Inputs[4] - Input
        50, // Inputs[4] - Time
        1, // Inputs[4] - Value (1)
        0, // Inputs[4] - Value (2)
        5, // Inputs[5] - Input
        0, // Inputs[5] - Time
        1, // Inputs[5] - Value (1)
        0, // Inputs[5] - Value (2)
        6, // Inputs[6] - Input
        0, // Inputs[6] - Time
        3, // Inputs[6] - Value (1)
        0, // Inputs[6] - Value (2)
        7, // Inputs[7] - Input
        232, // Inputs[7] - Time
        4, // Inputs[7] - Value (1)
        0, // Inputs[7] - Value (2)
        8, // Inputs[8] - Input
        0, // Inputs[8] - Time
        1, // Inputs[8] - Value (1)
        0, // Inputs[8] - Value (2)
        9, // Inputs[9] - Input
        20, // Inputs[9] - Time
        5, // Inputs[9] - Value (1)
        0, // Inputs[9] - Value (2)
        10, // Inputs[10] - Input
        40, // Inputs[10] - Time
        0, // Inputs[10] - Value (1)
        0, // Inputs[10] - Value (2)
        11, // Inputs[11] - Input
        0, // Inputs[11] - Time
        200, // Inputs[11] - Value (1)
        0, // Inputs[11] - Value (2)
        12, // Inputs[12] - Input
        0, // Inputs[12] - Time
        144, // Inputs[12] - Value (1)
        1, // Inputs[12] - Value (2)
        13, // Inputs[13] - Input
        0, // Inputs[13] - Time
        3, // Inputs[13] - Value (1)
        0, // Inputs[13] - Value (2)
        14, // Inputs[14] - Input
        200, // Inputs[14] - Time
        5, // Inputs[14] - Value (1)
        0, // Inputs[14] - Value (2)
        15, // Inputs[15] - Input
        0, // Inputs[15] - Time
        5, // Inputs[15] - Value (1)
        0, // Inputs[15] - Value (2)
        16, // Inputs[16] - Input
        0, // Inputs[16] - Time
        3, // Inputs[16] - Value (1)
        0, // Inputs[16] - Value (2)
        17, // Inputs[17] - Input
        0, // Inputs[17] - Time
        2, // Inputs[17] - Value (1)
        0, // Inputs[17] - Value (2)
        18, // Inputs[18] - Input
        88, // Inputs[18] - Time
        3, // Inputs[18] - Value (1)
        0, // Inputs[18] - Value (2)
        19, // Inputs[19] - Input
        60, // Inputs[19] - Time
        3, // Inputs[19] - Value (1)
        0, // Inputs[19] - Value (2)
      ]),
    });
  });

  describe('special inputs to receive AII packets', () => {
    testInstructionPacket({
      packetClass: IS_AIC,
      size: 4, // Default size without dynamic data
      type: PacketType.ISP_AIC,
      data: {
        ReqI: 1,
        PLID: 2,
        Inputs: [
          new AIInputVal({
            Input: AICInput.CS_SEND_AI_INFO,
          }),
          new AIInputVal({
            Input: AICInput.CS_REPEAT_AI_INFO,
            Time: 44,
          }),
        ],
      },
      buffer: new Uint8Array([
        12 / new IS_AIC().SIZE_MULTIPLIER, // Size
        68, // Type
        1, // ReqI
        2, // PLID
        240, // Inputs[0] - Input
        0, // Inputs[0] - Time
        0, // Inputs[0] - Value (1)
        0, // Inputs[0] - Value (2)
        241, // Inputs[1] - Input
        44, // Inputs[1] - Time
        0, // Inputs[1] - Value (1)
        0, // Inputs[1] - Value (2)
      ]),
    });
  });
});
