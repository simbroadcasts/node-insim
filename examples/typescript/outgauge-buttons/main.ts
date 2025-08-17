import {
  DashLights,
  InSim,
  OutGauge,
  OutGaugeFlags,
  OutGaugePack,
} from 'node-insim';
import {
  ButtonStyle,
  ButtonTextColour,
  IS_BTN,
  IS_ISI_ReqI,
  PacketType,
} from 'node-insim/packets';

const inSim = new InSim();

inSim.connect({
  IName: 'Node InSim App',
  Host: '127.0.0.1',
  Port: 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Admin: '',
});

inSim.on('connect', () => console.log('InSim connected'));
inSim.on('disconnect', () => console.log('InSim disconnected'));

const outGauge = new OutGauge({ timeout: 5000 });

console.log('Connecting...');

outGauge.connect({
  Host: '127.0.0.1',
  Port: 29998,
});

outGauge.on('connect', () => console.log('OutGauge connected'));
outGauge.on('disconnect', () => console.log('OutGauge disconnected'));
outGauge.on('timeout', () => console.log('OutGauge timed out'));

inSim.on(PacketType.ISP_VER, (packet) => {
  if (packet.ReqI !== IS_ISI_ReqI.SEND_VERSION) {
    return;
  }

  const top = 18;
  const left = 70;
  const height = 5;
  const labelWidth = 25;
  const valueWidth = 20;

  const rows: Record<string, (data: OutGaugePack) => string> = {
    Car: (data) => data.Car,
    Shift: (data) => truthy(data.Flags & OutGaugeFlags.OG_SHIFT),
    Ctrl: (data) => truthy(data.Flags & OutGaugeFlags.OG_CTRL),
    Turbo: (data) => truthy(data.Flags & OutGaugeFlags.OG_TURBO),
    'Speed units': (data) =>
      data.Flags & OutGaugeFlags.OG_KM ? 'km/h' : 'mph',
    'Pressure units': (data) =>
      data.Flags & OutGaugeFlags.OG_BAR ? 'bar' : 'psi',
    Gear: (data) => data.Gear.toFixed(0),
    PLID: (data) => data.PLID.toFixed(0),
    'Speed (m/s)': (data) => data.Speed.toFixed(0),
    RPM: (data) => data.RPM.toFixed(0),
    'Turbo pressure (bar)': (data) => data.Turbo.toFixed(3),
    'Engine temperature (C)': (data) => data.EngTemp.toFixed(3),
    'Fuel (%)': (data) => (data.Fuel * 100).toFixed(3),
    'Oil pressure (bar)': (data) => data.OilPressure.toFixed(3),
    'Oil temperature (C)': (data) => data.OilTemp.toFixed(3),
    Throttle: (data) => data.Throttle.toFixed(3),
    Brake: (data) => data.Brake.toFixed(3),
    Clutch: (data) => data.Clutch.toFixed(3),
    Display1: (data) => data.Display1,
    Display2: (data) => data.Display2,
    ID: (data) => data.ID.toFixed(0),
  };

  const dashLightsTop = top - height;
  const dashLightsLeft = left + labelWidth + valueWidth + 5;
  const dashLightsWidth = 23;

  const dashLightsMap = new Map<DashLights, string>([
    [DashLights.DL_SIDELIGHTS, 'sidelights'],
    [DashLights.DL_LOWBEAM, 'low beam'],
    [DashLights.DL_FULLBEAM, 'high beam'],
    [DashLights.DL_SIGNAL_L, 'left indicator'],
    [DashLights.DL_SIGNAL_R, 'right indicator'],
    [DashLights.DL_SIGNAL_ANY, 'shared indicator'],
    [DashLights.DL_FOG_REAR, 'rear fog light'],
    [DashLights.DL_FOG_FRONT, 'front fog light'],
    [DashLights.DL_HANDBRAKE, 'handbrake'],
    [DashLights.DL_SHIFT, 'shift light'],
    [DashLights.DL_NEUTRAL, 'neutral'],
    [DashLights.DL_PITSPEED, 'pit speed limiter'],
    [DashLights.DL_TC, 'traction control'],
    [DashLights.DL_ABS, 'ABS'],
    [DashLights.DL_OILWARN, 'oil pressure warning'],
    [DashLights.DL_BATTERY, 'battery warning'],
    [DashLights.DL_FUELWARN, 'fuel warning'],
    [DashLights.DL_ENGINE, 'engine damage'],
  ]);

  let clickId = 0;

  Object.keys(rows).forEach((label, index) => {
    inSim.send(
      new IS_BTN({
        ReqI: 1,
        ClickID: ++clickId,
        T: top + height * index,
        L: left,
        W: labelWidth,
        H: height,
        Text: label,
        BStyle:
          ButtonStyle.ISB_DARK |
          ButtonStyle.ISB_LEFT |
          ButtonTextColour.TITLE_COLOUR,
      }),
    );
  });

  inSim.send(
    new IS_BTN({
      ReqI: 1,
      ClickID: ++clickId,
      T: dashLightsTop,
      L: dashLightsLeft,
      W: dashLightsWidth,
      H: height,
      Text: 'Dashboard lights',
      BStyle: ButtonTextColour.TITLE_COLOUR,
    }),
  );

  outGauge.on('packet', (data) => {
    let dynamicClickId = clickId;

    Object.values(rows).forEach((getValue, index) => {
      inSim.send(
        new IS_BTN({
          ReqI: 1,
          ClickID: ++dynamicClickId,
          T: top + height * index,
          L: left + labelWidth,
          W: valueWidth,
          H: height,
          Text: getValue(data),
          BStyle:
            ButtonStyle.ISB_LIGHT |
            ButtonStyle.ISB_RIGHT |
            ButtonTextColour.UNSELECTED_TEXT,
        }),
      );
    });

    Array.from(dashLightsMap.entries()).forEach(([flag, label], index) => {
      const isDashLightAvailable = Boolean(data.DashLights & Number(flag));
      const isDashLightOn = Boolean(data.ShowLights & Number(flag));

      inSim.send(
        new IS_BTN({
          ReqI: 1,
          ClickID: ++dynamicClickId,
          T: dashLightsTop + (index + 1) * height,
          L: dashLightsLeft,
          W: dashLightsWidth,
          H: height,
          Text: label,
          BStyle:
            ButtonStyle.ISB_LIGHT |
            (isDashLightAvailable
              ? isDashLightOn
                ? ButtonTextColour.SELECTED_TEXT
                : ButtonTextColour.UNSELECTED_TEXT
              : ButtonTextColour.UNAVAILABLE),
        }),
      );
    });
  });
});

const truthy = (value: number) => (value ? 'yes' : 'no');

process.on('uncaughtException', (error) => {
  console.log(error);
});
