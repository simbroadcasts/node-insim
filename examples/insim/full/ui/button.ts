import type { IS_BTC, IS_BTN_Data, IS_BTT } from '../../../../src/packets';
import { IS_BTN, MAX_CLICK_ID, PacketType } from '../../../../src/packets';
import type { InSim } from '../../../../src/protocols';

let clickId = 0;

export type ButtonData = Omit<IS_BTN_Data, 'ClickID'> & CustomButtonProps;

export type DrawButtonConfig = {
  clickId: number;
  update: (buttonData: ButtonData) => void;
};

type CustomButtonProps = {
  onClick?: (packet: IS_BTC, inSim: InSim, config: DrawButtonConfig) => void;
  onType?: (packet: IS_BTT, inSim: InSim, config: DrawButtonConfig) => void;
};

export function drawButton(
  inSim: InSim,
  buttonData: ButtonData,
): DrawButtonConfig {
  const button = new IS_BTN({
    ...buttonData,
    ClickID: getNextClickId(),
  });

  const update = (newData: ButtonData) => {
    if (newData.onClick) {
      inSim.on(PacketType.ISP_BTC, (packet, inSim) => {
        if (button.ClickID === packet.ClickID) {
          newData.onClick?.(packet, inSim, {
            clickId: button.ClickID,
            update,
          });
        }
      });
    }

    if (newData.onType) {
      inSim.on(PacketType.ISP_BTT, (packet, inSim) => {
        if (button.ClickID === packet.ClickID) {
          newData.onType?.(packet, inSim, {
            clickId: button.ClickID,
            update,
          });
        }
      });
    }
    const newButton = new IS_BTN({
      ...newData,
      ClickID: button.ClickID,
    });

    inSim.send(newButton);
  };

  if (buttonData.onClick) {
    inSim.on(PacketType.ISP_BTC, (packet, inSim) => {
      if (button.ClickID === packet.ClickID) {
        buttonData.onClick?.(packet, inSim, {
          clickId: button.ClickID,
          update,
        });
      }
    });
  }

  if (buttonData.onType) {
    inSim.on(PacketType.ISP_BTT, (packet, inSim) => {
      if (button.ClickID === packet.ClickID) {
        buttonData.onType?.(packet, inSim, {
          clickId: button.ClickID,
          update,
        });
      }
    });
  }

  inSim.send(button);

  return {
    clickId: button.ClickID,
    update,
  };
}

function getNextClickId() {
  return clickId === MAX_CLICK_ID ? (clickId = 0) : ++clickId;
}
