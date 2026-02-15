import { DashLights } from './DashLights';
import { OutGaugeFlags } from './OutGaugeFlags';
import { OutGaugePack } from './OutGaugePack';

describe('OutGaugePack', () => {
  describe('without OutGauge ID', () => {
    const buffer = new Uint8Array([
      152, // Time (1)
      7, // Time (2)
      1, // Time (3)
      0, // Time (4)
      88, // Car (1)
      82, // Car (2)
      84, // Car (3)
      0, // Car (4)
      0, // Flags (1)
      224, // Flags (2)
      3, // Gear
      1, // PLID
      232, // Speed (1)
      40, // Speed (2)
      51, // Speed (3)
      65, // Speed (4)
      64, // RPM (1)
      38, // RPM (2)
      25, // RPM (3)
      69, // RPM (4)
      83, // Turbo (1)
      255, // Turbo (2)
      127, // Turbo (3)
      191, // Turbo (4)
      0, // EngTemp (1)
      0, // EngTemp (2)
      0, // EngTemp (3)
      0, // EngTemp (4)
      79, // Fuel (1)
      246, // Fuel (2)
      127, // Fuel (3)
      63, // Fuel (4)
      0, // OilPressure (1)
      0, // OilPressure (2)
      0, // OilPressure (3)
      0, // OilPressure (4)
      0, // OilTemp (1)
      0, // OilTemp (2)
      0, // OilTemp (3)
      0, // OilTemp (4)
      102, // DashLights (1)
      7, // DashLights (2)
      0, // DashLights (3)
      0, // DashLights (4)
      0, // ShowLights (1)
      0, // ShowLights (2)
      0, // ShowLights (3)
      0, // ShowLights (4)
      64, // Throttle (1)
      38, // Throttle (2)
      25, // Throttle (3)
      60, // Throttle (4)
      64, // Brake (1)
      32, // Brake (2)
      32, // Brake (3)
      55, // Brake (4)
      66, // Clutch (1)
      33, // Clutch (2)
      34, // Clutch (3)
      62, // Clutch (4)
      70, // Display1[16]
      117,
      101,
      108,
      32,
      57,
      57,
      46,
      57,
      37,
      32,
      32,
      32,
      0,
      0,
      0,
      66, // Display2[16]
      114,
      97,
      107,
      101,
      32,
      66,
      97,
      108,
      32,
      70,
      114,
      32,
      55,
      53,
      37,
    ]);

    it('should unpack data from a buffer into a packet instance', () => {
      const packet = new OutGaugePack().unpack(buffer);
      expect(packet.Time).toEqual(67480);
      expect(packet.Car).toEqual('XRT');
      expect(packet.Flags).toEqual(
        OutGaugeFlags.OG_BAR | OutGaugeFlags.OG_KM | OutGaugeFlags.OG_TURBO,
      );
      expect(packet.Gear).toEqual(3);
      expect(packet.PLID).toEqual(1);
      expect(packet.Speed).toEqual(11.197486877441406);
      expect(packet.RPM).toEqual(2450.390625);
      expect(packet.Turbo).toEqual(-0.9999896883964539);
      expect(packet.EngTemp).toEqual(0);
      expect(packet.Fuel).toEqual(0.9998521208763123);
      expect(packet.OilPressure).toEqual(0);
      expect(packet.OilTemp).toEqual(0);
      expect(packet.DashLights).toEqual(
        DashLights.DL_FULLBEAM |
          DashLights.DL_HANDBRAKE |
          DashLights.DL_SIGNAL_L |
          DashLights.DL_SIGNAL_R |
          DashLights.DL_OILWARN |
          DashLights.DL_BATTERY |
          DashLights.DL_ABS,
      );
      expect(packet.ShowLights).toEqual(0);
      expect(packet.Throttle).toEqual(0.009347498416900635);
      expect(packet.Brake).toEqual(0.000009544251952320337);
      expect(packet.Clutch).toEqual(0.15832999348640442);
      expect(packet.Display1).toEqual('Fuel 99.9%   ');
      expect(packet.Display2).toEqual('Brake Bal Fr 75%');
      expect(packet.ID).toEqual(0);
    });
  });

  describe('with OutGauge ID', () => {
    const buffer = new Uint8Array([
      152, // Time (1)
      7, // Time (2)
      1, // Time (3)
      0, // Time (4)
      88, // Car (1)
      82, // Car (2)
      84, // Car (3)
      0, // Car (4)
      0, // Flags (1)
      224, // Flags (2)
      3, // Gear
      1, // PLID
      232, // Speed (1)
      40, // Speed (2)
      51, // Speed (3)
      65, // Speed (4)
      64, // RPM (1)
      38, // RPM (2)
      25, // RPM (3)
      69, // RPM (4)
      83, // Turbo (1)
      255, // Turbo (2)
      127, // Turbo (3)
      191, // Turbo (4)
      0, // EngTemp (1)
      0, // EngTemp (2)
      0, // EngTemp (3)
      0, // EngTemp (4)
      79, // Fuel (1)
      246, // Fuel (2)
      127, // Fuel (3)
      63, // Fuel (4)
      0, // OilPressure (1)
      0, // OilPressure (2)
      0, // OilPressure (3)
      0, // OilPressure (4)
      0, // OilTemp (1)
      0, // OilTemp (2)
      0, // OilTemp (3)
      0, // OilTemp (4)
      102, // DashLights (1)
      7, // DashLights (2)
      0, // DashLights (3)
      0, // DashLights (4)
      0, // ShowLights (1)
      0, // ShowLights (2)
      0, // ShowLights (3)
      0, // ShowLights (4)
      64, // Throttle (1)
      38, // Throttle (2)
      25, // Throttle (3)
      60, // Throttle (4)
      64, // Brake (1)
      32, // Brake (2)
      32, // Brake (3)
      55, // Brake (4)
      66, // Clutch (1)
      33, // Clutch (2)
      34, // Clutch (3)
      62, // Clutch (4)
      70, // Display1[16]
      117,
      101,
      108,
      32,
      57,
      57,
      46,
      57,
      37,
      32,
      32,
      32,
      0,
      0,
      0,
      66, // Display2[16]
      114,
      97,
      107,
      101,
      32,
      66,
      97,
      108,
      32,
      70,
      114,
      32,
      55,
      53,
      37,
      64, // ID (1)
      4, // ID (2)
      3, // ID (3)
      1, // ID (4)
    ]);

    it('should unpack data from a buffer into a packet instance', () => {
      const packet = new OutGaugePack().unpack(buffer);
      expect(packet.Time).toEqual(67480);
      expect(packet.Car).toEqual('XRT');
      expect(packet.Flags).toEqual(
        OutGaugeFlags.OG_BAR | OutGaugeFlags.OG_KM | OutGaugeFlags.OG_TURBO,
      );
      expect(packet.Gear).toEqual(3);
      expect(packet.PLID).toEqual(1);
      expect(packet.Speed).toEqual(11.197486877441406);
      expect(packet.RPM).toEqual(2450.390625);
      expect(packet.Turbo).toEqual(-0.9999896883964539);
      expect(packet.EngTemp).toEqual(0);
      expect(packet.Fuel).toEqual(0.9998521208763123);
      expect(packet.OilPressure).toEqual(0);
      expect(packet.OilTemp).toEqual(0);
      expect(packet.DashLights).toEqual(
        DashLights.DL_FULLBEAM |
          DashLights.DL_HANDBRAKE |
          DashLights.DL_SIGNAL_L |
          DashLights.DL_SIGNAL_R |
          DashLights.DL_OILWARN |
          DashLights.DL_BATTERY |
          DashLights.DL_ABS,
      );
      expect(packet.ShowLights).toEqual(0);
      expect(packet.Throttle).toEqual(0.009347498416900635);
      expect(packet.Brake).toEqual(0.000009544251952320337);
      expect(packet.Clutch).toEqual(0.15832999348640442);
      expect(packet.Display1).toEqual('Fuel 99.9%   ');
      expect(packet.Display2).toEqual('Brake Bal Fr 75%');
      expect(packet.ID).toEqual(16974912);
    });
  });
});
