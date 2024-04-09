import { OutSimOptions } from './OutSimOptions';
import { OutSimPack2 } from './OutSimPack2';

describe('OutSimPack2', () => {
  describe('Header', () => {
    const buffer = new Uint8Array([
      76, // Header (1)
      70, // Header (2)
      83, // Header (3)
      84, // Header (4)
    ]);

    it('should unpack header data from a buffer into a packet instance', () => {
      const packet = new OutSimPack2(OutSimOptions.OSO_HEADER).unpack(buffer);
      expect(packet.Header).toEqual('LFST');
      expect(packet.ID).toEqual(0);
      expect(packet.Time).toEqual(0);
      expect(packet.OSMain.AngVel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Heading).toEqual(0);
      expect(packet.OSMain.Pitch).toEqual(0);
      expect(packet.OSMain.Roll).toEqual(0);
      expect(packet.OSMain.Accel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Vel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Pos).toEqual([0, 0, 0]);
      expect(packet.OSInputs.Throttle).toEqual(0);
      expect(packet.OSInputs.Brake).toEqual(0);
      expect(packet.OSInputs.InputSteer).toEqual(0);
      expect(packet.OSInputs.Clutch).toEqual(0);
      expect(packet.OSInputs.Handbrake).toEqual(0);
      expect(packet.Gear).toEqual(0);
      expect(packet.Sp1).toEqual(0);
      expect(packet.Sp2).toEqual(0);
      expect(packet.Sp3).toEqual(0);
      expect(packet.EngineAngVel).toEqual(0);
      expect(packet.MaxTorqueAtVel).toEqual(0);
      expect(packet.CurrentLapDist).toEqual(0);
      expect(packet.IndexedDistance).toEqual(0);
      expect(packet.OSWheels).toHaveLength(4);
      expect(packet.OSWheels[0].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[0].Steer).toEqual(0);
      expect(packet.OSWheels[0].XForce).toEqual(0);
      expect(packet.OSWheels[0].YForce).toEqual(0);
      expect(packet.OSWheels[0].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[0].AngVel).toEqual(0);
      expect(packet.OSWheels[0].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[0].AirTemp).toEqual(0);
      expect(packet.OSWheels[0].SlipFraction).toEqual(0);
      expect(packet.OSWheels[0].Touching).toEqual(0);
      expect(packet.OSWheels[0].Sp3).toEqual(0);
      expect(packet.OSWheels[0].SlipRatio).toEqual(0);
      expect(packet.OSWheels[0].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[1].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[1].Steer).toEqual(0);
      expect(packet.OSWheels[1].XForce).toEqual(0);
      expect(packet.OSWheels[1].YForce).toEqual(0);
      expect(packet.OSWheels[1].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[1].AngVel).toEqual(0);
      expect(packet.OSWheels[1].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[1].AirTemp).toEqual(0);
      expect(packet.OSWheels[1].SlipFraction).toEqual(0);
      expect(packet.OSWheels[1].Touching).toEqual(0);
      expect(packet.OSWheels[1].Sp3).toEqual(0);
      expect(packet.OSWheels[1].SlipRatio).toEqual(0);
      expect(packet.OSWheels[1].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[2].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[2].Steer).toEqual(0);
      expect(packet.OSWheels[2].XForce).toEqual(0);
      expect(packet.OSWheels[2].YForce).toEqual(0);
      expect(packet.OSWheels[2].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[2].AngVel).toEqual(0);
      expect(packet.OSWheels[2].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[2].AirTemp).toEqual(0);
      expect(packet.OSWheels[2].SlipFraction).toEqual(0);
      expect(packet.OSWheels[2].Touching).toEqual(0);
      expect(packet.OSWheels[2].Sp3).toEqual(0);
      expect(packet.OSWheels[2].SlipRatio).toEqual(0);
      expect(packet.OSWheels[2].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[3].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[3].Steer).toEqual(0);
      expect(packet.OSWheels[3].XForce).toEqual(0);
      expect(packet.OSWheels[3].YForce).toEqual(0);
      expect(packet.OSWheels[3].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[3].AngVel).toEqual(0);
      expect(packet.OSWheels[3].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[3].AirTemp).toEqual(0);
      expect(packet.OSWheels[3].SlipFraction).toEqual(0);
      expect(packet.OSWheels[3].Touching).toEqual(0);
      expect(packet.OSWheels[3].Sp3).toEqual(0);
      expect(packet.OSWheels[3].SlipRatio).toEqual(0);
      expect(packet.OSWheels[3].TanSlipAngle).toEqual(0);
      expect(packet.SteerTorque).toEqual(0);
      expect(packet.Spare).toEqual(0);
    });
  });

  describe('ID', () => {
    const buffer = new Uint8Array([
      64, // ID (1)
      4, // ID (2)
      5, // ID (3)
      7, // ID (4)
    ]);

    it('should unpack ID data from a buffer into a packet instance', () => {
      const packet = new OutSimPack2(OutSimOptions.OSO_ID).unpack(buffer);
      expect(packet.Header).toEqual('');
      expect(packet.ID).toEqual(117769280);
      expect(packet.Time).toEqual(0);
      expect(packet.OSMain.AngVel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Heading).toEqual(0);
      expect(packet.OSMain.Pitch).toEqual(0);
      expect(packet.OSMain.Roll).toEqual(0);
      expect(packet.OSMain.Accel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Vel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Pos).toEqual([0, 0, 0]);
      expect(packet.OSInputs.Throttle).toEqual(0);
      expect(packet.OSInputs.Brake).toEqual(0);
      expect(packet.OSInputs.InputSteer).toEqual(0);
      expect(packet.OSInputs.Clutch).toEqual(0);
      expect(packet.OSInputs.Handbrake).toEqual(0);
      expect(packet.Gear).toEqual(0);
      expect(packet.Sp1).toEqual(0);
      expect(packet.Sp2).toEqual(0);
      expect(packet.Sp3).toEqual(0);
      expect(packet.EngineAngVel).toEqual(0);
      expect(packet.MaxTorqueAtVel).toEqual(0);
      expect(packet.CurrentLapDist).toEqual(0);
      expect(packet.IndexedDistance).toEqual(0);
      expect(packet.OSWheels).toHaveLength(4);
      expect(packet.OSWheels[0].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[0].Steer).toEqual(0);
      expect(packet.OSWheels[0].XForce).toEqual(0);
      expect(packet.OSWheels[0].YForce).toEqual(0);
      expect(packet.OSWheels[0].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[0].AngVel).toEqual(0);
      expect(packet.OSWheels[0].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[0].AirTemp).toEqual(0);
      expect(packet.OSWheels[0].SlipFraction).toEqual(0);
      expect(packet.OSWheels[0].Touching).toEqual(0);
      expect(packet.OSWheels[0].Sp3).toEqual(0);
      expect(packet.OSWheels[0].SlipRatio).toEqual(0);
      expect(packet.OSWheels[0].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[1].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[1].Steer).toEqual(0);
      expect(packet.OSWheels[1].XForce).toEqual(0);
      expect(packet.OSWheels[1].YForce).toEqual(0);
      expect(packet.OSWheels[1].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[1].AngVel).toEqual(0);
      expect(packet.OSWheels[1].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[1].AirTemp).toEqual(0);
      expect(packet.OSWheels[1].SlipFraction).toEqual(0);
      expect(packet.OSWheels[1].Touching).toEqual(0);
      expect(packet.OSWheels[1].Sp3).toEqual(0);
      expect(packet.OSWheels[1].SlipRatio).toEqual(0);
      expect(packet.OSWheels[1].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[2].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[2].Steer).toEqual(0);
      expect(packet.OSWheels[2].XForce).toEqual(0);
      expect(packet.OSWheels[2].YForce).toEqual(0);
      expect(packet.OSWheels[2].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[2].AngVel).toEqual(0);
      expect(packet.OSWheels[2].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[2].AirTemp).toEqual(0);
      expect(packet.OSWheels[2].SlipFraction).toEqual(0);
      expect(packet.OSWheels[2].Touching).toEqual(0);
      expect(packet.OSWheels[2].Sp3).toEqual(0);
      expect(packet.OSWheels[2].SlipRatio).toEqual(0);
      expect(packet.OSWheels[2].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[3].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[3].Steer).toEqual(0);
      expect(packet.OSWheels[3].XForce).toEqual(0);
      expect(packet.OSWheels[3].YForce).toEqual(0);
      expect(packet.OSWheels[3].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[3].AngVel).toEqual(0);
      expect(packet.OSWheels[3].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[3].AirTemp).toEqual(0);
      expect(packet.OSWheels[3].SlipFraction).toEqual(0);
      expect(packet.OSWheels[3].Touching).toEqual(0);
      expect(packet.OSWheels[3].Sp3).toEqual(0);
      expect(packet.OSWheels[3].SlipRatio).toEqual(0);
      expect(packet.OSWheels[3].TanSlipAngle).toEqual(0);
      expect(packet.SteerTorque).toEqual(0);
      expect(packet.Spare).toEqual(0);
    });
  });

  describe('Time', () => {
    const buffer = new Uint8Array([
      240, // Time (1)
      50, // Time (2)
      0, // Time (3)
      0, // Time (4)
    ]);

    it('should unpack time data from a buffer into a packet instance', () => {
      const packet = new OutSimPack2(OutSimOptions.OSO_TIME).unpack(buffer);
      expect(packet.Header).toEqual('');
      expect(packet.ID).toEqual(0);
      expect(packet.Time).toEqual(13040);
      expect(packet.OSMain.AngVel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Heading).toEqual(0);
      expect(packet.OSMain.Pitch).toEqual(0);
      expect(packet.OSMain.Roll).toEqual(0);
      expect(packet.OSMain.Accel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Vel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Pos).toEqual([0, 0, 0]);
      expect(packet.OSInputs.Throttle).toEqual(0);
      expect(packet.OSInputs.Brake).toEqual(0);
      expect(packet.OSInputs.InputSteer).toEqual(0);
      expect(packet.OSInputs.Clutch).toEqual(0);
      expect(packet.OSInputs.Handbrake).toEqual(0);
      expect(packet.Gear).toEqual(0);
      expect(packet.Sp1).toEqual(0);
      expect(packet.Sp2).toEqual(0);
      expect(packet.Sp3).toEqual(0);
      expect(packet.EngineAngVel).toEqual(0);
      expect(packet.MaxTorqueAtVel).toEqual(0);
      expect(packet.CurrentLapDist).toEqual(0);
      expect(packet.IndexedDistance).toEqual(0);
      expect(packet.OSWheels).toHaveLength(4);
      expect(packet.OSWheels[0].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[0].Steer).toEqual(0);
      expect(packet.OSWheels[0].XForce).toEqual(0);
      expect(packet.OSWheels[0].YForce).toEqual(0);
      expect(packet.OSWheels[0].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[0].AngVel).toEqual(0);
      expect(packet.OSWheels[0].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[0].AirTemp).toEqual(0);
      expect(packet.OSWheels[0].SlipFraction).toEqual(0);
      expect(packet.OSWheels[0].Touching).toEqual(0);
      expect(packet.OSWheels[0].Sp3).toEqual(0);
      expect(packet.OSWheels[0].SlipRatio).toEqual(0);
      expect(packet.OSWheels[0].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[1].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[1].Steer).toEqual(0);
      expect(packet.OSWheels[1].XForce).toEqual(0);
      expect(packet.OSWheels[1].YForce).toEqual(0);
      expect(packet.OSWheels[1].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[1].AngVel).toEqual(0);
      expect(packet.OSWheels[1].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[1].AirTemp).toEqual(0);
      expect(packet.OSWheels[1].SlipFraction).toEqual(0);
      expect(packet.OSWheels[1].Touching).toEqual(0);
      expect(packet.OSWheels[1].Sp3).toEqual(0);
      expect(packet.OSWheels[1].SlipRatio).toEqual(0);
      expect(packet.OSWheels[1].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[2].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[2].Steer).toEqual(0);
      expect(packet.OSWheels[2].XForce).toEqual(0);
      expect(packet.OSWheels[2].YForce).toEqual(0);
      expect(packet.OSWheels[2].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[2].AngVel).toEqual(0);
      expect(packet.OSWheels[2].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[2].AirTemp).toEqual(0);
      expect(packet.OSWheels[2].SlipFraction).toEqual(0);
      expect(packet.OSWheels[2].Touching).toEqual(0);
      expect(packet.OSWheels[2].Sp3).toEqual(0);
      expect(packet.OSWheels[2].SlipRatio).toEqual(0);
      expect(packet.OSWheels[2].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[3].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[3].Steer).toEqual(0);
      expect(packet.OSWheels[3].XForce).toEqual(0);
      expect(packet.OSWheels[3].YForce).toEqual(0);
      expect(packet.OSWheels[3].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[3].AngVel).toEqual(0);
      expect(packet.OSWheels[3].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[3].AirTemp).toEqual(0);
      expect(packet.OSWheels[3].SlipFraction).toEqual(0);
      expect(packet.OSWheels[3].Touching).toEqual(0);
      expect(packet.OSWheels[3].Sp3).toEqual(0);
      expect(packet.OSWheels[3].SlipRatio).toEqual(0);
      expect(packet.OSWheels[3].TanSlipAngle).toEqual(0);
      expect(packet.SteerTorque).toEqual(0);
      expect(packet.Spare).toEqual(0);
    });
  });

  describe('Main', () => {
    const buffer = new Uint8Array([
      126, // AngVelX (1)
      231, // AngVelX (2)
      140, // AngVelX (3)
      188, // AngVelX (4)
      0, // AngVelY (1)
      70, // AngVelY (2)
      13, // AngVelY (3)
      188, // AngVelY (4)
      130, // AngVelZ (1)
      122, // AngVelZ (2)
      165, // AngVelZ (3)
      187, // AngVelZ (4)
      138, // Heading (1)
      10, // Heading (2)
      83, // Heading (3)
      182, // Heading (4)
      248, // Pitch (1)
      153, // Pitch (2)
      138, // Pitch (3)
      60, // Pitch (4)
      156, // Roll (1)
      143, // Roll (2)
      135, // Roll (3)
      186, // Roll (4)
      47, // AccelX (1)
      77, // AccelX (2)
      153, // AccelX (3)
      57, // AccelX (4)
      159, // AccelY (1)
      58, // AccelY (2)
      102, // AccelY (3)
      57, // AccelY (4)
      222, // AccelZ (1)
      252, // AccelZ (2)
      251, // AccelZ (3)
      58, // AccelZ (4)
      247, // VelX (1)
      213, // VelX (2)
      50, // VelX (3)
      183, // VelX (4)
      34, // VelY (1)
      197, // VelY (2)
      114, // VelY (3)
      56, // VelY (4)
      218, // VelZ (1)
      126, // VelZ (2)
      10, // VelZ (3)
      56, // VelZ (4)
      249, // PosX (1)
      255, // PosX (2)
      79, // PosX (3)
      253, // PosX (4)
      161, // PosY (1)
      255, // PosY (2)
      97, // PosY (3)
      248, // PosY (4)
      185, // PosZ (1)
      26, // PosZ (2)
      2, // PosZ (3)
      0, // PosZ (4)
    ]);

    it('should unpack main data from a buffer into a packet instance', () => {
      const packet = new OutSimPack2(OutSimOptions.OSO_MAIN).unpack(buffer);
      expect(packet.Header).toEqual('');
      expect(packet.ID).toEqual(0);
      expect(packet.Time).toEqual(0);
      expect(packet.OSMain.AngVel).toEqual([
        -0.017200227826833725, -0.00862264633178711, -0.005050004459917545,
      ]);
      expect(packet.OSMain.Heading).toEqual(-0.0000031447584660782013);
      expect(packet.OSMain.Pitch).toEqual(0.016919121146202087);
      expect(packet.OSMain.Roll).toEqual(-0.0010342481546103954);
      expect(packet.OSMain.Accel).toEqual([
        0.0002923994034063071, 0.0002195634733652696, 0.0019225140567868948,
      ]);
      expect(packet.OSMain.Vel).toEqual([
        -0.000010659444342309143, 0.000057880890381056815,
        0.00003301990363979712,
      ]);
      expect(packet.OSMain.Pos).toEqual([-45088775, -127795295, 137913]);
      expect(packet.OSInputs.Throttle).toEqual(0);
      expect(packet.OSInputs.Brake).toEqual(0);
      expect(packet.OSInputs.InputSteer).toEqual(0);
      expect(packet.OSInputs.Clutch).toEqual(0);
      expect(packet.OSInputs.Handbrake).toEqual(0);
      expect(packet.Gear).toEqual(0);
      expect(packet.Sp1).toEqual(0);
      expect(packet.Sp2).toEqual(0);
      expect(packet.Sp3).toEqual(0);
      expect(packet.EngineAngVel).toEqual(0);
      expect(packet.MaxTorqueAtVel).toEqual(0);
      expect(packet.CurrentLapDist).toEqual(0);
      expect(packet.IndexedDistance).toEqual(0);
      expect(packet.OSWheels).toHaveLength(4);
      expect(packet.OSWheels[0].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[0].Steer).toEqual(0);
      expect(packet.OSWheels[0].XForce).toEqual(0);
      expect(packet.OSWheels[0].YForce).toEqual(0);
      expect(packet.OSWheels[0].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[0].AngVel).toEqual(0);
      expect(packet.OSWheels[0].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[0].AirTemp).toEqual(0);
      expect(packet.OSWheels[0].SlipFraction).toEqual(0);
      expect(packet.OSWheels[0].Touching).toEqual(0);
      expect(packet.OSWheels[0].Sp3).toEqual(0);
      expect(packet.OSWheels[0].SlipRatio).toEqual(0);
      expect(packet.OSWheels[0].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[1].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[1].Steer).toEqual(0);
      expect(packet.OSWheels[1].XForce).toEqual(0);
      expect(packet.OSWheels[1].YForce).toEqual(0);
      expect(packet.OSWheels[1].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[1].AngVel).toEqual(0);
      expect(packet.OSWheels[1].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[1].AirTemp).toEqual(0);
      expect(packet.OSWheels[1].SlipFraction).toEqual(0);
      expect(packet.OSWheels[1].Touching).toEqual(0);
      expect(packet.OSWheels[1].Sp3).toEqual(0);
      expect(packet.OSWheels[1].SlipRatio).toEqual(0);
      expect(packet.OSWheels[1].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[2].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[2].Steer).toEqual(0);
      expect(packet.OSWheels[2].XForce).toEqual(0);
      expect(packet.OSWheels[2].YForce).toEqual(0);
      expect(packet.OSWheels[2].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[2].AngVel).toEqual(0);
      expect(packet.OSWheels[2].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[2].AirTemp).toEqual(0);
      expect(packet.OSWheels[2].SlipFraction).toEqual(0);
      expect(packet.OSWheels[2].Touching).toEqual(0);
      expect(packet.OSWheels[2].Sp3).toEqual(0);
      expect(packet.OSWheels[2].SlipRatio).toEqual(0);
      expect(packet.OSWheels[2].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[3].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[3].Steer).toEqual(0);
      expect(packet.OSWheels[3].XForce).toEqual(0);
      expect(packet.OSWheels[3].YForce).toEqual(0);
      expect(packet.OSWheels[3].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[3].AngVel).toEqual(0);
      expect(packet.OSWheels[3].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[3].AirTemp).toEqual(0);
      expect(packet.OSWheels[3].SlipFraction).toEqual(0);
      expect(packet.OSWheels[3].Touching).toEqual(0);
      expect(packet.OSWheels[3].Sp3).toEqual(0);
      expect(packet.OSWheels[3].SlipRatio).toEqual(0);
      expect(packet.OSWheels[3].TanSlipAngle).toEqual(0);
      expect(packet.SteerTorque).toEqual(0);
      expect(packet.Spare).toEqual(0);
    });
  });

  describe('Inputs', () => {
    const buffer = new Uint8Array([
      184, // Throttle (1)
      81, // Throttle (2)
      56, // Throttle (3)
      63, // Throttle (4)
      164, // Brake (1)
      216, // Brake (2)
      35, // Brake (3)
      62, // Brake (4)
      108, // InputSteer (1)
      188, // InputSteer (2)
      156, // InputSteer (3)
      62, // InputSteer (4)
      248, // Clutch (1)
      240, // Clutch (2)
      90, // Clutch (3)
      63, // Clutch (4)
      0, // Handbrake (1)
      0, // Handbrake (2)
      128, // Handbrake (3)
      63, // Handbrake (4)
    ]);

    it('should unpack inputs data from a buffer into a packet instance', () => {
      const packet = new OutSimPack2(OutSimOptions.OSO_INPUTS).unpack(buffer);
      expect(packet.Header).toEqual('');
      expect(packet.ID).toEqual(0);
      expect(packet.Time).toEqual(0);
      expect(packet.OSMain.AngVel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Heading).toEqual(0);
      expect(packet.OSMain.Pitch).toEqual(0);
      expect(packet.OSMain.Roll).toEqual(0);
      expect(packet.OSMain.Accel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Vel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Pos).toEqual([0, 0, 0]);
      expect(packet.OSInputs.Throttle).toEqual(0.7199969291687012);
      expect(packet.OSInputs.Brake).toEqual(0.1600061058998108);
      expect(packet.OSInputs.InputSteer).toEqual(0.30612504482269287);
      expect(packet.OSInputs.Clutch).toEqual(0.8552393913269043);
      expect(packet.OSInputs.Handbrake).toEqual(1);
      expect(packet.Gear).toEqual(0);
      expect(packet.Sp1).toEqual(0);
      expect(packet.Sp2).toEqual(0);
      expect(packet.Sp3).toEqual(0);
      expect(packet.EngineAngVel).toEqual(0);
      expect(packet.MaxTorqueAtVel).toEqual(0);
      expect(packet.CurrentLapDist).toEqual(0);
      expect(packet.IndexedDistance).toEqual(0);
      expect(packet.OSWheels).toHaveLength(4);
      expect(packet.OSWheels[0].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[0].Steer).toEqual(0);
      expect(packet.OSWheels[0].XForce).toEqual(0);
      expect(packet.OSWheels[0].YForce).toEqual(0);
      expect(packet.OSWheels[0].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[0].AngVel).toEqual(0);
      expect(packet.OSWheels[0].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[0].AirTemp).toEqual(0);
      expect(packet.OSWheels[0].SlipFraction).toEqual(0);
      expect(packet.OSWheels[0].Touching).toEqual(0);
      expect(packet.OSWheels[0].Sp3).toEqual(0);
      expect(packet.OSWheels[0].SlipRatio).toEqual(0);
      expect(packet.OSWheels[0].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[1].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[1].Steer).toEqual(0);
      expect(packet.OSWheels[1].XForce).toEqual(0);
      expect(packet.OSWheels[1].YForce).toEqual(0);
      expect(packet.OSWheels[1].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[1].AngVel).toEqual(0);
      expect(packet.OSWheels[1].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[1].AirTemp).toEqual(0);
      expect(packet.OSWheels[1].SlipFraction).toEqual(0);
      expect(packet.OSWheels[1].Touching).toEqual(0);
      expect(packet.OSWheels[1].Sp3).toEqual(0);
      expect(packet.OSWheels[1].SlipRatio).toEqual(0);
      expect(packet.OSWheels[1].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[2].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[2].Steer).toEqual(0);
      expect(packet.OSWheels[2].XForce).toEqual(0);
      expect(packet.OSWheels[2].YForce).toEqual(0);
      expect(packet.OSWheels[2].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[2].AngVel).toEqual(0);
      expect(packet.OSWheels[2].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[2].AirTemp).toEqual(0);
      expect(packet.OSWheels[2].SlipFraction).toEqual(0);
      expect(packet.OSWheels[2].Touching).toEqual(0);
      expect(packet.OSWheels[2].Sp3).toEqual(0);
      expect(packet.OSWheels[2].SlipRatio).toEqual(0);
      expect(packet.OSWheels[2].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[3].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[3].Steer).toEqual(0);
      expect(packet.OSWheels[3].XForce).toEqual(0);
      expect(packet.OSWheels[3].YForce).toEqual(0);
      expect(packet.OSWheels[3].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[3].AngVel).toEqual(0);
      expect(packet.OSWheels[3].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[3].AirTemp).toEqual(0);
      expect(packet.OSWheels[3].SlipFraction).toEqual(0);
      expect(packet.OSWheels[3].Touching).toEqual(0);
      expect(packet.OSWheels[3].Sp3).toEqual(0);
      expect(packet.OSWheels[3].SlipRatio).toEqual(0);
      expect(packet.OSWheels[3].TanSlipAngle).toEqual(0);
      expect(packet.SteerTorque).toEqual(0);
      expect(packet.Spare).toEqual(0);
    });
  });

  describe('Drive', () => {
    const buffer = new Uint8Array([
      3, // Gear
      0, // Sp1
      0, // Sp2
      0, // Sp3
      12, // EngineAngVel (1)
      9, // EngineAngVel (2)
      209, // EngineAngVel (3)
      67, // EngineAngVel (4)
      73, // MaxTorqueAtVel (1)
      168, // MaxTorqueAtVel (2)
      172, // MaxTorqueAtVel (3)
      67, // MaxTorqueAtVel (4)
    ]);

    it('should unpack drive data from a buffer into a packet instance', () => {
      const packet = new OutSimPack2(OutSimOptions.OSO_DRIVE).unpack(buffer);
      expect(packet.Header).toEqual('');
      expect(packet.ID).toEqual(0);
      expect(packet.Time).toEqual(0);
      expect(packet.OSMain.AngVel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Heading).toEqual(0);
      expect(packet.OSMain.Pitch).toEqual(0);
      expect(packet.OSMain.Roll).toEqual(0);
      expect(packet.OSMain.Accel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Vel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Pos).toEqual([0, 0, 0]);
      expect(packet.OSInputs.Throttle).toEqual(0);
      expect(packet.OSInputs.Brake).toEqual(0);
      expect(packet.OSInputs.InputSteer).toEqual(0);
      expect(packet.OSInputs.Clutch).toEqual(0);
      expect(packet.OSInputs.Handbrake).toEqual(0);
      expect(packet.Gear).toEqual(3);
      expect(packet.Sp1).toEqual(0);
      expect(packet.Sp2).toEqual(0);
      expect(packet.Sp3).toEqual(0);
      expect(packet.EngineAngVel).toEqual(418.0706787109375);
      expect(packet.MaxTorqueAtVel).toEqual(345.3147277832031);
      expect(packet.CurrentLapDist).toEqual(0);
      expect(packet.IndexedDistance).toEqual(0);
      expect(packet.OSWheels).toHaveLength(4);
      expect(packet.OSWheels[0].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[0].Steer).toEqual(0);
      expect(packet.OSWheels[0].XForce).toEqual(0);
      expect(packet.OSWheels[0].YForce).toEqual(0);
      expect(packet.OSWheels[0].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[0].AngVel).toEqual(0);
      expect(packet.OSWheels[0].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[0].AirTemp).toEqual(0);
      expect(packet.OSWheels[0].SlipFraction).toEqual(0);
      expect(packet.OSWheels[0].Touching).toEqual(0);
      expect(packet.OSWheels[0].Sp3).toEqual(0);
      expect(packet.OSWheels[0].SlipRatio).toEqual(0);
      expect(packet.OSWheels[0].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[1].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[1].Steer).toEqual(0);
      expect(packet.OSWheels[1].XForce).toEqual(0);
      expect(packet.OSWheels[1].YForce).toEqual(0);
      expect(packet.OSWheels[1].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[1].AngVel).toEqual(0);
      expect(packet.OSWheels[1].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[1].AirTemp).toEqual(0);
      expect(packet.OSWheels[1].SlipFraction).toEqual(0);
      expect(packet.OSWheels[1].Touching).toEqual(0);
      expect(packet.OSWheels[1].Sp3).toEqual(0);
      expect(packet.OSWheels[1].SlipRatio).toEqual(0);
      expect(packet.OSWheels[1].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[2].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[2].Steer).toEqual(0);
      expect(packet.OSWheels[2].XForce).toEqual(0);
      expect(packet.OSWheels[2].YForce).toEqual(0);
      expect(packet.OSWheels[2].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[2].AngVel).toEqual(0);
      expect(packet.OSWheels[2].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[2].AirTemp).toEqual(0);
      expect(packet.OSWheels[2].SlipFraction).toEqual(0);
      expect(packet.OSWheels[2].Touching).toEqual(0);
      expect(packet.OSWheels[2].Sp3).toEqual(0);
      expect(packet.OSWheels[2].SlipRatio).toEqual(0);
      expect(packet.OSWheels[2].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[3].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[3].Steer).toEqual(0);
      expect(packet.OSWheels[3].XForce).toEqual(0);
      expect(packet.OSWheels[3].YForce).toEqual(0);
      expect(packet.OSWheels[3].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[3].AngVel).toEqual(0);
      expect(packet.OSWheels[3].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[3].AirTemp).toEqual(0);
      expect(packet.OSWheels[3].SlipFraction).toEqual(0);
      expect(packet.OSWheels[3].Touching).toEqual(0);
      expect(packet.OSWheels[3].Sp3).toEqual(0);
      expect(packet.OSWheels[3].SlipRatio).toEqual(0);
      expect(packet.OSWheels[3].TanSlipAngle).toEqual(0);
      expect(packet.SteerTorque).toEqual(0);
      expect(packet.Spare).toEqual(0);
    });
  });

  describe('Distance', () => {
    const buffer = new Uint8Array([
      196, // CurrentLapDist (1)
      218, // CurrentLapDist (2)
      246, // CurrentLapDist (3)
      66, // CurrentLapDist (4)
      119, // IndexedDistance (1)
      111, // IndexedDistance (2)
      245, // IndexedDistance (3)
      66, // IndexedDistance (4)
    ]);

    it('should unpack distance data from a buffer into a packet instance', () => {
      const packet = new OutSimPack2(OutSimOptions.OSO_DISTANCE).unpack(buffer);
      expect(packet.Header).toEqual('');
      expect(packet.ID).toEqual(0);
      expect(packet.Time).toEqual(0);
      expect(packet.OSMain.AngVel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Heading).toEqual(0);
      expect(packet.OSMain.Pitch).toEqual(0);
      expect(packet.OSMain.Roll).toEqual(0);
      expect(packet.OSMain.Accel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Vel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Pos).toEqual([0, 0, 0]);
      expect(packet.OSInputs.Throttle).toEqual(0);
      expect(packet.OSInputs.Brake).toEqual(0);
      expect(packet.OSInputs.InputSteer).toEqual(0);
      expect(packet.OSInputs.Clutch).toEqual(0);
      expect(packet.OSInputs.Handbrake).toEqual(0);
      expect(packet.Gear).toEqual(0);
      expect(packet.Sp1).toEqual(0);
      expect(packet.Sp2).toEqual(0);
      expect(packet.Sp3).toEqual(0);
      expect(packet.EngineAngVel).toEqual(0);
      expect(packet.MaxTorqueAtVel).toEqual(0);
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      expect(packet.CurrentLapDist).toEqual(123.42727661132812);
      expect(packet.IndexedDistance).toEqual(122.71770477294922);
      expect(packet.OSWheels).toHaveLength(4);
      expect(packet.OSWheels[0].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[0].Steer).toEqual(0);
      expect(packet.OSWheels[0].XForce).toEqual(0);
      expect(packet.OSWheels[0].YForce).toEqual(0);
      expect(packet.OSWheels[0].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[0].AngVel).toEqual(0);
      expect(packet.OSWheels[0].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[0].AirTemp).toEqual(0);
      expect(packet.OSWheels[0].SlipFraction).toEqual(0);
      expect(packet.OSWheels[0].Touching).toEqual(0);
      expect(packet.OSWheels[0].Sp3).toEqual(0);
      expect(packet.OSWheels[0].SlipRatio).toEqual(0);
      expect(packet.OSWheels[0].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[1].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[1].Steer).toEqual(0);
      expect(packet.OSWheels[1].XForce).toEqual(0);
      expect(packet.OSWheels[1].YForce).toEqual(0);
      expect(packet.OSWheels[1].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[1].AngVel).toEqual(0);
      expect(packet.OSWheels[1].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[1].AirTemp).toEqual(0);
      expect(packet.OSWheels[1].SlipFraction).toEqual(0);
      expect(packet.OSWheels[1].Touching).toEqual(0);
      expect(packet.OSWheels[1].Sp3).toEqual(0);
      expect(packet.OSWheels[1].SlipRatio).toEqual(0);
      expect(packet.OSWheels[1].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[2].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[2].Steer).toEqual(0);
      expect(packet.OSWheels[2].XForce).toEqual(0);
      expect(packet.OSWheels[2].YForce).toEqual(0);
      expect(packet.OSWheels[2].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[2].AngVel).toEqual(0);
      expect(packet.OSWheels[2].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[2].AirTemp).toEqual(0);
      expect(packet.OSWheels[2].SlipFraction).toEqual(0);
      expect(packet.OSWheels[2].Touching).toEqual(0);
      expect(packet.OSWheels[2].Sp3).toEqual(0);
      expect(packet.OSWheels[2].SlipRatio).toEqual(0);
      expect(packet.OSWheels[2].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[3].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[3].Steer).toEqual(0);
      expect(packet.OSWheels[3].XForce).toEqual(0);
      expect(packet.OSWheels[3].YForce).toEqual(0);
      expect(packet.OSWheels[3].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[3].AngVel).toEqual(0);
      expect(packet.OSWheels[3].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[3].AirTemp).toEqual(0);
      expect(packet.OSWheels[3].SlipFraction).toEqual(0);
      expect(packet.OSWheels[3].Touching).toEqual(0);
      expect(packet.OSWheels[3].Sp3).toEqual(0);
      expect(packet.OSWheels[3].SlipRatio).toEqual(0);
      expect(packet.OSWheels[3].TanSlipAngle).toEqual(0);
      expect(packet.SteerTorque).toEqual(0);
      expect(packet.Spare).toEqual(0);
    });
  });

  describe('Wheels', () => {
    const buffer = new Uint8Array([
      73, // OSWheels[0] - SuspDeflect (1)
      105, // OSWheels[0] - SuspDeflect (2)
      203, // OSWheels[0] - SuspDeflect (3)
      61, // OSWheels[0] - SuspDeflect (4)
      137, // OSWheels[0] - Steer (1)
      195, // OSWheels[0] - Steer (2)
      100, // OSWheels[0] - Steer (3)
      187, // OSWheels[0] - Steer (4)
      119, // OSWheels[0] - XForce (1)
      195, // OSWheels[0] - XForce (2)
      149, // OSWheels[0] - XForce (3)
      69, // OSWheels[0] - XForce (4)
      145, // OSWheels[0] - YForce (1)
      221, // OSWheels[0] - YForce (2)
      91, // OSWheels[0] - YForce (3)
      69, // OSWheels[0] - YForce (4)
      194, // OSWheels[0] - VerticalLoad (1)
      102, // OSWheels[0] - VerticalLoad (2)
      150, // OSWheels[0] - VerticalLoad (3)
      69, // OSWheels[0] - VerticalLoad (4)
      132, // OSWheels[0] - AngVel (1)
      235, // OSWheels[0] - AngVel (2)
      140, // OSWheels[0] - AngVel (3)
      66, // OSWheels[0] - AngVel (4)
      59, // OSWheels[0] - LeanRelToRoad (1)
      242, // OSWheels[0] - LeanRelToRoad (2)
      242, // OSWheels[0] - LeanRelToRoad (3)
      60, // OSWheels[0] - LeanRelToRoad (4)
      40, // OSWheels[0] - AirTemp
      255, // OSWheels[0] - SlipFraction
      1, // OSWheels[0] - Touching
      0, // OSWheels[0] - Sp3
      204, // OSWheels[0] - SlipRatio (1)
      118, // OSWheels[0] - SlipRatio (2)
      45, // OSWheels[0] - SlipRatio (3)
      61, // OSWheels[0] - SlipRatio (4)
      5, // OSWheels[0] - TanSlipAngle (1)
      141, // OSWheels[0] - TanSlipAngle (2)
      252, // OSWheels[0] - TanSlipAngle (3)
      61, // OSWheels[0] - TanSlipAngle (4)

      221, // OSWheels[1] - SuspDeflect (1)
      10, // OSWheels[1] - SuspDeflect (2)
      111, // OSWheels[1] - SuspDeflect (3)
      61, // OSWheels[1] - SuspDeflect (4)
      137, // OSWheels[1] - Steer (1)
      195, // OSWheels[1] - Steer (2)
      100, // OSWheels[1] - Steer (3)
      59, // OSWheels[1] - Steer (4)
      52, // OSWheels[1] - XForce (1)
      245, // OSWheels[1] - XForce (2)
      201, // OSWheels[1] - XForce (3)
      68, // OSWheels[1] - XForce (4)
      33, // OSWheels[1] - YForce (1)
      186, // OSWheels[1] - YForce (2)
      8, // OSWheels[1] - YForce (3)
      69, // OSWheels[1] - YForce (4)
      80, // OSWheels[1] - VerticalLoad (1)
      151, // OSWheels[1] - VerticalLoad (2)
      12, // OSWheels[1] - VerticalLoad (3)
      69, // OSWheels[1] - VerticalLoad (4)
      231, // OSWheels[1] - AngVel (1)
      104, // OSWheels[1] - AngVel (2)
      141, // OSWheels[1] - AngVel (3)
      66, // OSWheels[1] - AngVel (4)
      69, // OSWheels[1] - LeanRelToRoad (1)
      12, // OSWheels[1] - LeanRelToRoad (2)
      133, // OSWheels[1] - LeanRelToRoad (3)
      61, // OSWheels[1] - LeanRelToRoad (4)
      40, // OSWheels[1] - AirTemp
      255, // OSWheels[1] - SlipFraction
      1, // OSWheels[1] - Touching
      0, // OSWheels[1] - Sp3
      215, // OSWheels[1] - SlipRatio (1)
      172, // OSWheels[1] - SlipRatio (2)
      197, // OSWheels[1] - SlipRatio (3)
      61, // OSWheels[1] - SlipRatio (4)
      69, // OSWheels[1] - TanSlipAngle (1)
      42, // OSWheels[1] - TanSlipAngle (2)
      250, // OSWheels[1] - TanSlipAngle (3)
      61, // OSWheels[1] - TanSlipAngle (4)

      43, // OSWheels[2] - SuspDeflect (1)
      80, // OSWheels[2] - SuspDeflect (2)
      116, // OSWheels[2] - SuspDeflect (3)
      61, // OSWheels[2] - SuspDeflect (4)
      68, // OSWheels[2] - Steer (1)
      253, // OSWheels[2] - Steer (2)
      166, // OSWheels[2] - Steer (3)
      189, // OSWheels[2] - Steer (4)
      179, // OSWheels[2] - XForce (1)
      55, // OSWheels[2] - XForce (2)
      161, // OSWheels[2] - XForce (3)
      69, // OSWheels[2] - XForce (4)
      93, // OSWheels[2] - YForce (1)
      225, // OSWheels[2] - YForce (2)
      179, // OSWheels[2] - YForce (3)
      195, // OSWheels[2] - YForce (4)
      22, // OSWheels[2] - VerticalLoad (1)
      250, // OSWheels[2] - VerticalLoad (2)
      151, // OSWheels[2] - VerticalLoad (3)
      69, // OSWheels[2] - VerticalLoad (4)
      190, // OSWheels[2] - AngVel (1)
      198, // OSWheels[2] - AngVel (2)
      132, // OSWheels[2] - AngVel (3)
      66, // OSWheels[2] - AngVel (4)
      193, // OSWheels[2] - LeanRelToRoad (1)
      113, // OSWheels[2] - LeanRelToRoad (2)
      229, // OSWheels[2] - LeanRelToRoad (3)
      60, // OSWheels[2] - LeanRelToRoad (4)
      40, // OSWheels[2] - AirTemp
      198, // OSWheels[2] - SlipFraction
      1, // OSWheels[2] - Touching
      0, // OSWheels[2] - Sp3
      88, // OSWheels[2] - SlipRatio (1)
      254, // OSWheels[2] - SlipRatio (2)
      173, // OSWheels[2] - SlipRatio (3)
      186, // OSWheels[2] - SlipRatio (4)
      195, // OSWheels[2] - TanSlipAngle (1)
      203, // OSWheels[2] - TanSlipAngle (2)
      1, // OSWheels[2] - TanSlipAngle (3)
      62, // OSWheels[2] - TanSlipAngle (4)

      65, // OSWheels[2] - SuspDeflect (1)
      185, // OSWheels[2] - SuspDeflect (2)
      186, // OSWheels[2] - SuspDeflect (3)
      60, // OSWheels[2] - SuspDeflect (4)
      166, // OSWheels[2] - Steer (1)
      175, // OSWheels[2] - Steer (2)
      171, // OSWheels[2] - Steer (3)
      189, // OSWheels[2] - Steer (4)
      255, // OSWheels[2] - XForce (1)
      218, // OSWheels[2] - XForce (2)
      119, // OSWheels[2] - XForce (3)
      67, // OSWheels[2] - XForce (4)
      9, // OSWheels[2] - YForce (1)
      13, // OSWheels[2] - YForce (2)
      223, // OSWheels[2] - YForce (3)
      193, // OSWheels[2] - YForce (4)
      232, // OSWheels[2] - VerticalLoad (1)
      240, // OSWheels[2] - VerticalLoad (2)
      138, // OSWheels[2] - VerticalLoad (3)
      65, // OSWheels[2] - VerticalLoad (4)
      217, // OSWheels[2] - AngVel (1)
      135, // OSWheels[2] - AngVel (2)
      122, // OSWheels[2] - AngVel (3)
      66, // OSWheels[2] - AngVel (4)
      43, // OSWheels[2] - LeanRelToRoad (1)
      2, // OSWheels[2] - LeanRelToRoad (2)
      72, // OSWheels[2] - LeanRelToRoad (2)
      61, // OSWheels[2] - LeanRelToRoad (4)
      40, // OSWheels[2] - AirTemp
      255, // OSWheels[2] - SlipFraction
      1, // OSWheels[2] - Touching
      0, // OSWheels[2] - Sp3
      54, // OSWheels[2] - SlipRatio (1)
      59, // OSWheels[2] - SlipRatio (2)
      55, // OSWheels[2] - SlipRatio (3)
      188, // OSWheels[2] - SlipRatio (4)
      95, // OSWheels[2] - TanSlipAngle (1)
      86, // OSWheels[2] - TanSlipAngle (2)
      7, // OSWheels[2] - TanSlipAngle (3)
      62, // OSWheels[2] - TanSlipAngle (4)
    ]);

    it('should unpack wheels data from a buffer into a packet instance', () => {
      const packet = new OutSimPack2(OutSimOptions.OSO_WHEELS).unpack(buffer);
      expect(packet.Header).toEqual('');
      expect(packet.ID).toEqual(0);
      expect(packet.Time).toEqual(0);
      expect(packet.OSMain.AngVel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Heading).toEqual(0);
      expect(packet.OSMain.Pitch).toEqual(0);
      expect(packet.OSMain.Roll).toEqual(0);
      expect(packet.OSMain.Accel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Vel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Pos).toEqual([0, 0, 0]);
      expect(packet.OSInputs.Throttle).toEqual(0);
      expect(packet.OSInputs.Brake).toEqual(0);
      expect(packet.OSInputs.InputSteer).toEqual(0);
      expect(packet.OSInputs.Clutch).toEqual(0);
      expect(packet.OSInputs.Handbrake).toEqual(0);
      expect(packet.Gear).toEqual(0);
      expect(packet.Sp1).toEqual(0);
      expect(packet.Sp2).toEqual(0);
      expect(packet.Sp3).toEqual(0);
      expect(packet.EngineAngVel).toEqual(0);
      expect(packet.MaxTorqueAtVel).toEqual(0);
      expect(packet.CurrentLapDist).toEqual(0);
      expect(packet.IndexedDistance).toEqual(0);
      expect(packet.OSWheels).toHaveLength(4);
      expect(packet.OSWheels[0].SuspDeflect).toEqual(0.09932190924882889);
      expect(packet.OSWheels[0].Steer).toEqual(-0.0034906587097793818);
      expect(packet.OSWheels[0].XForce).toEqual(4792.43310546875);
      expect(packet.OSWheels[0].YForce).toEqual(3517.847900390625);
      expect(packet.OSWheels[0].VerticalLoad).toEqual(4812.8447265625);
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      expect(packet.OSWheels[0].AngVel).toEqual(70.45999145507812);
      expect(packet.OSWheels[0].LeanRelToRoad).toEqual(0.02965652011334896);
      expect(packet.OSWheels[0].AirTemp).toEqual(40);
      expect(packet.OSWheels[0].SlipFraction).toEqual(255);
      expect(packet.OSWheels[0].Touching).toEqual(1);
      expect(packet.OSWheels[0].Sp3).toEqual(0);
      expect(packet.OSWheels[0].SlipRatio).toEqual(0.042349621653556824);
      expect(packet.OSWheels[0].TanSlipAngle).toEqual(0.12331584841012955);

      expect(packet.OSWheels[1].SuspDeflect).toEqual(0.05835996940732002);
      expect(packet.OSWheels[1].Steer).toEqual(0.0034906587097793818);
      expect(packet.OSWheels[1].XForce).toEqual(1615.66259765625);
      expect(packet.OSWheels[1].YForce).toEqual(2187.633056640625);
      expect(packet.OSWheels[1].VerticalLoad).toEqual(2249.45703125);
      expect(packet.OSWheels[1].AngVel).toEqual(70.70488739013672);
      expect(packet.OSWheels[1].LeanRelToRoad).toEqual(0.06496480852365494);
      expect(packet.OSWheels[1].AirTemp).toEqual(40);
      expect(packet.OSWheels[1].SlipFraction).toEqual(255);
      expect(packet.OSWheels[1].Touching).toEqual(1);
      expect(packet.OSWheels[1].Sp3).toEqual(0);
      expect(packet.OSWheels[1].SlipRatio).toEqual(0.09652107208967209);
      expect(packet.OSWheels[1].TanSlipAngle).toEqual(0.12215093523263931);

      expect(packet.OSWheels[2].SuspDeflect).toEqual(0.059646766632795334);
      expect(packet.OSWheels[2].Steer).toEqual(-0.08153775334358215);
      expect(packet.OSWheels[2].XForce).toEqual(5158.96240234375);
      expect(packet.OSWheels[2].YForce).toEqual(-359.7606506347656);
      expect(packet.OSWheels[2].VerticalLoad).toEqual(4863.2607421875);
      expect(packet.OSWheels[2].AngVel).toEqual(66.38816833496094);
      expect(packet.OSWheels[2].LeanRelToRoad).toEqual(0.028008343651890755);
      expect(packet.OSWheels[2].AirTemp).toEqual(40);
      expect(packet.OSWheels[2].SlipFraction).toEqual(198);
      expect(packet.OSWheels[2].Touching).toEqual(1);
      expect(packet.OSWheels[2].Sp3).toEqual(0);
      expect(packet.OSWheels[2].SlipRatio).toEqual(-0.0013274652883410454);
      expect(packet.OSWheels[2].TanSlipAngle).toEqual(0.12675385177135468);

      expect(packet.OSWheels[3].SuspDeflect).toEqual(0.022793414071202278);
      expect(packet.OSWheels[3].Steer).toEqual(-0.08383111655712128);
      expect(packet.OSWheels[3].XForce).toEqual(247.85545349121094);
      expect(packet.OSWheels[3].YForce).toEqual(-27.881364822387695);
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      expect(packet.OSWheels[3].VerticalLoad).toEqual(17.367630004882812);
      expect(packet.OSWheels[3].AngVel).toEqual(62.63266372680664);
      expect(packet.OSWheels[3].LeanRelToRoad).toEqual(0.048830192536115646);
      expect(packet.OSWheels[3].AirTemp).toEqual(40);
      expect(packet.OSWheels[3].SlipFraction).toEqual(255);
      expect(packet.OSWheels[3].Touching).toEqual(1);
      expect(packet.OSWheels[3].Sp3).toEqual(0);
      expect(packet.OSWheels[3].SlipRatio).toEqual(-0.011183550581336021);
      expect(packet.OSWheels[3].TanSlipAngle).toEqual(0.13216541707515717);
      expect(packet.SteerTorque).toEqual(0);
      expect(packet.Spare).toEqual(0);
    });
  });

  describe('Extra', () => {
    const buffer = new Uint8Array([
      45, // SteerTorque (1)
      155, // SteerTorque (2)
      16, // SteerTorque (3)
      195, // SteerTorque (4)
      0, // Spare (1)
      0, // Spare (2)
      0, // Spare (3)
      0, // Spare (4)
    ]);

    it('should unpack extra data from a buffer into a packet instance', () => {
      const packet = new OutSimPack2(OutSimOptions.OSO_EXTRA_1).unpack(buffer);
      expect(packet.Header).toEqual('');
      expect(packet.ID).toEqual(0);
      expect(packet.Time).toEqual(0);
      expect(packet.OSMain.AngVel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Heading).toEqual(0);
      expect(packet.OSMain.Pitch).toEqual(0);
      expect(packet.OSMain.Roll).toEqual(0);
      expect(packet.OSMain.Accel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Vel).toEqual([0, 0, 0]);
      expect(packet.OSMain.Pos).toEqual([0, 0, 0]);
      expect(packet.OSInputs.Throttle).toEqual(0);
      expect(packet.OSInputs.Brake).toEqual(0);
      expect(packet.OSInputs.InputSteer).toEqual(0);
      expect(packet.OSInputs.Clutch).toEqual(0);
      expect(packet.OSInputs.Handbrake).toEqual(0);
      expect(packet.Gear).toEqual(0);
      expect(packet.Sp1).toEqual(0);
      expect(packet.Sp2).toEqual(0);
      expect(packet.Sp3).toEqual(0);
      expect(packet.EngineAngVel).toEqual(0);
      expect(packet.MaxTorqueAtVel).toEqual(0);
      expect(packet.CurrentLapDist).toEqual(0);
      expect(packet.IndexedDistance).toEqual(0);
      expect(packet.OSWheels).toHaveLength(4);
      expect(packet.OSWheels[0].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[0].Steer).toEqual(0);
      expect(packet.OSWheels[0].XForce).toEqual(0);
      expect(packet.OSWheels[0].YForce).toEqual(0);
      expect(packet.OSWheels[0].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[0].AngVel).toEqual(0);
      expect(packet.OSWheels[0].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[0].AirTemp).toEqual(0);
      expect(packet.OSWheels[0].SlipFraction).toEqual(0);
      expect(packet.OSWheels[0].Touching).toEqual(0);
      expect(packet.OSWheels[0].Sp3).toEqual(0);
      expect(packet.OSWheels[0].SlipRatio).toEqual(0);
      expect(packet.OSWheels[0].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[1].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[1].Steer).toEqual(0);
      expect(packet.OSWheels[1].XForce).toEqual(0);
      expect(packet.OSWheels[1].YForce).toEqual(0);
      expect(packet.OSWheels[1].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[1].AngVel).toEqual(0);
      expect(packet.OSWheels[1].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[1].AirTemp).toEqual(0);
      expect(packet.OSWheels[1].SlipFraction).toEqual(0);
      expect(packet.OSWheels[1].Touching).toEqual(0);
      expect(packet.OSWheels[1].Sp3).toEqual(0);
      expect(packet.OSWheels[1].SlipRatio).toEqual(0);
      expect(packet.OSWheels[1].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[2].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[2].Steer).toEqual(0);
      expect(packet.OSWheels[2].XForce).toEqual(0);
      expect(packet.OSWheels[2].YForce).toEqual(0);
      expect(packet.OSWheels[2].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[2].AngVel).toEqual(0);
      expect(packet.OSWheels[2].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[2].AirTemp).toEqual(0);
      expect(packet.OSWheels[2].SlipFraction).toEqual(0);
      expect(packet.OSWheels[2].Touching).toEqual(0);
      expect(packet.OSWheels[2].Sp3).toEqual(0);
      expect(packet.OSWheels[2].SlipRatio).toEqual(0);
      expect(packet.OSWheels[2].TanSlipAngle).toEqual(0);
      expect(packet.OSWheels[3].SuspDeflect).toEqual(0);
      expect(packet.OSWheels[3].Steer).toEqual(0);
      expect(packet.OSWheels[3].XForce).toEqual(0);
      expect(packet.OSWheels[3].YForce).toEqual(0);
      expect(packet.OSWheels[3].VerticalLoad).toEqual(0);
      expect(packet.OSWheels[3].AngVel).toEqual(0);
      expect(packet.OSWheels[3].LeanRelToRoad).toEqual(0);
      expect(packet.OSWheels[3].AirTemp).toEqual(0);
      expect(packet.OSWheels[3].SlipFraction).toEqual(0);
      expect(packet.OSWheels[3].Touching).toEqual(0);
      expect(packet.OSWheels[3].Sp3).toEqual(0);
      expect(packet.OSWheels[3].SlipRatio).toEqual(0);
      expect(packet.OSWheels[3].TanSlipAngle).toEqual(0);
      expect(packet.SteerTorque).toEqual(-144.6061553955078);
      expect(packet.Spare).toEqual(0);
    });
  });

  describe('All data', () => {
    const buffer = new Uint8Array([
      76, // Header (1)
      70, // Header (2)
      83, // Header (3)
      84, // Header (4)

      64, // ID (1)
      4, // ID (2)
      5, // ID (3)
      7, // ID (4)

      240, // Time (1)
      50, // Time (2)
      0, // Time (3)
      0, // Time (4)

      126, // AngVelX (1)
      231, // AngVelX (2)
      140, // AngVelX (3)
      188, // AngVelX (4)
      0, // AngVelY (1)
      70, // AngVelY (2)
      13, // AngVelY (3)
      188, // AngVelY (4)
      130, // AngVelZ (1)
      122, // AngVelZ (2)
      165, // AngVelZ (3)
      187, // AngVelZ (4)
      138, // Heading (1)
      10, // Heading (2)
      83, // Heading (3)
      182, // Heading (4)
      248, // Pitch (1)
      153, // Pitch (2)
      138, // Pitch (3)
      60, // Pitch (4)
      156, // Roll (1)
      143, // Roll (2)
      135, // Roll (3)
      186, // Roll (4)
      47, // AccelX (1)
      77, // AccelX (2)
      153, // AccelX (3)
      57, // AccelX (4)
      159, // AccelY (1)
      58, // AccelY (2)
      102, // AccelY (3)
      57, // AccelY (4)
      222, // AccelZ (1)
      252, // AccelZ (2)
      251, // AccelZ (3)
      58, // AccelZ (4)
      247, // VelX (1)
      213, // VelX (2)
      50, // VelX (3)
      183, // VelX (4)
      34, // VelY (1)
      197, // VelY (2)
      114, // VelY (3)
      56, // VelY (4)
      218, // VelZ (1)
      126, // VelZ (2)
      10, // VelZ (3)
      56, // VelZ (4)
      249, // PosX (1)
      255, // PosX (2)
      79, // PosX (3)
      253, // PosX (4)
      161, // PosY (1)
      255, // PosY (2)
      97, // PosY (3)
      248, // PosY (4)
      185, // PosZ (1)
      26, // PosZ (2)
      2, // PosZ (3)
      0, // PosZ (4)

      184, // Throttle (1)
      81, // Throttle (2)
      56, // Throttle (3)
      63, // Throttle (4)
      164, // Brake (1)
      216, // Brake (2)
      35, // Brake (3)
      62, // Brake (4)
      108, // InputSteer (1)
      188, // InputSteer (2)
      156, // InputSteer (3)
      62, // InputSteer (4)
      248, // Clutch (1)
      240, // Clutch (2)
      90, // Clutch (3)
      63, // Clutch (4)
      0, // Handbrake (1)
      0, // Handbrake (2)
      128, // Handbrake (3)
      63, // Handbrake (4)

      3, // Gear
      0, // Sp1
      0, // Sp2
      0, // Sp3
      12, // EngineAngVel (1)
      9, // EngineAngVel (2)
      209, // EngineAngVel (3)
      67, // EngineAngVel (4)
      73, // MaxTorqueAtVel (1)
      168, // MaxTorqueAtVel (2)
      172, // MaxTorqueAtVel (3)
      67, // MaxTorqueAtVel (4)

      196, // CurrentLapDist (1)
      218, // CurrentLapDist (2)
      246, // CurrentLapDist (3)
      66, // CurrentLapDist (4)
      119, // IndexedDistance (1)
      111, // IndexedDistance (2)
      245, // IndexedDistance (3)
      66, // IndexedDistance (4)

      73, // OSWheels[0] - SuspDeflect (1)
      105, // OSWheels[0] - SuspDeflect (2)
      203, // OSWheels[0] - SuspDeflect (3)
      61, // OSWheels[0] - SuspDeflect (4)
      137, // OSWheels[0] - Steer (1)
      195, // OSWheels[0] - Steer (2)
      100, // OSWheels[0] - Steer (3)
      187, // OSWheels[0] - Steer (4)
      119, // OSWheels[0] - XForce (1)
      195, // OSWheels[0] - XForce (2)
      149, // OSWheels[0] - XForce (3)
      69, // OSWheels[0] - XForce (4)
      145, // OSWheels[0] - YForce (1)
      221, // OSWheels[0] - YForce (2)
      91, // OSWheels[0] - YForce (3)
      69, // OSWheels[0] - YForce (4)
      194, // OSWheels[0] - VerticalLoad (1)
      102, // OSWheels[0] - VerticalLoad (2)
      150, // OSWheels[0] - VerticalLoad (3)
      69, // OSWheels[0] - VerticalLoad (4)
      132, // OSWheels[0] - AngVel (1)
      235, // OSWheels[0] - AngVel (2)
      140, // OSWheels[0] - AngVel (3)
      66, // OSWheels[0] - AngVel (4)
      59, // OSWheels[0] - LeanRelToRoad (1)
      242, // OSWheels[0] - LeanRelToRoad (2)
      242, // OSWheels[0] - LeanRelToRoad (3)
      60, // OSWheels[0] - LeanRelToRoad (4)
      40, // OSWheels[0] - AirTemp
      255, // OSWheels[0] - SlipFraction
      1, // OSWheels[0] - Touching
      0, // OSWheels[0] - Sp3
      204, // OSWheels[0] - SlipRatio (1)
      118, // OSWheels[0] - SlipRatio (2)
      45, // OSWheels[0] - SlipRatio (3)
      61, // OSWheels[0] - SlipRatio (4)
      5, // OSWheels[0] - TanSlipAngle (1)
      141, // OSWheels[0] - TanSlipAngle (2)
      252, // OSWheels[0] - TanSlipAngle (3)
      61, // OSWheels[0] - TanSlipAngle (4)

      221, // OSWheels[1] - SuspDeflect (1)
      10, // OSWheels[1] - SuspDeflect (2)
      111, // OSWheels[1] - SuspDeflect (3)
      61, // OSWheels[1] - SuspDeflect (4)
      137, // OSWheels[1] - Steer (1)
      195, // OSWheels[1] - Steer (2)
      100, // OSWheels[1] - Steer (3)
      59, // OSWheels[1] - Steer (4)
      52, // OSWheels[1] - XForce (1)
      245, // OSWheels[1] - XForce (2)
      201, // OSWheels[1] - XForce (3)
      68, // OSWheels[1] - XForce (4)
      33, // OSWheels[1] - YForce (1)
      186, // OSWheels[1] - YForce (2)
      8, // OSWheels[1] - YForce (3)
      69, // OSWheels[1] - YForce (4)
      80, // OSWheels[1] - VerticalLoad (1)
      151, // OSWheels[1] - VerticalLoad (2)
      12, // OSWheels[1] - VerticalLoad (3)
      69, // OSWheels[1] - VerticalLoad (4)
      231, // OSWheels[1] - AngVel (1)
      104, // OSWheels[1] - AngVel (2)
      141, // OSWheels[1] - AngVel (3)
      66, // OSWheels[1] - AngVel (4)
      69, // OSWheels[1] - LeanRelToRoad (1)
      12, // OSWheels[1] - LeanRelToRoad (2)
      133, // OSWheels[1] - LeanRelToRoad (3)
      61, // OSWheels[1] - LeanRelToRoad (4)
      40, // OSWheels[1] - AirTemp
      255, // OSWheels[1] - SlipFraction
      1, // OSWheels[1] - Touching
      0, // OSWheels[1] - Sp3
      215, // OSWheels[1] - SlipRatio (1)
      172, // OSWheels[1] - SlipRatio (2)
      197, // OSWheels[1] - SlipRatio (3)
      61, // OSWheels[1] - SlipRatio (4)
      69, // OSWheels[1] - TanSlipAngle (1)
      42, // OSWheels[1] - TanSlipAngle (2)
      250, // OSWheels[1] - TanSlipAngle (3)
      61, // OSWheels[1] - TanSlipAngle (4)

      43, // OSWheels[2] - SuspDeflect (1)
      80, // OSWheels[2] - SuspDeflect (2)
      116, // OSWheels[2] - SuspDeflect (3)
      61, // OSWheels[2] - SuspDeflect (4)
      68, // OSWheels[2] - Steer (1)
      253, // OSWheels[2] - Steer (2)
      166, // OSWheels[2] - Steer (3)
      189, // OSWheels[2] - Steer (4)
      179, // OSWheels[2] - XForce (1)
      55, // OSWheels[2] - XForce (2)
      161, // OSWheels[2] - XForce (3)
      69, // OSWheels[2] - XForce (4)
      93, // OSWheels[2] - YForce (1)
      225, // OSWheels[2] - YForce (2)
      179, // OSWheels[2] - YForce (3)
      195, // OSWheels[2] - YForce (4)
      22, // OSWheels[2] - VerticalLoad (1)
      250, // OSWheels[2] - VerticalLoad (2)
      151, // OSWheels[2] - VerticalLoad (3)
      69, // OSWheels[2] - VerticalLoad (4)
      190, // OSWheels[2] - AngVel (1)
      198, // OSWheels[2] - AngVel (2)
      132, // OSWheels[2] - AngVel (3)
      66, // OSWheels[2] - AngVel (4)
      193, // OSWheels[2] - LeanRelToRoad (1)
      113, // OSWheels[2] - LeanRelToRoad (2)
      229, // OSWheels[2] - LeanRelToRoad (3)
      60, // OSWheels[2] - LeanRelToRoad (4)
      40, // OSWheels[2] - AirTemp
      198, // OSWheels[2] - SlipFraction
      1, // OSWheels[2] - Touching
      0, // OSWheels[2] - Sp3
      88, // OSWheels[2] - SlipRatio (1)
      254, // OSWheels[2] - SlipRatio (2)
      173, // OSWheels[2] - SlipRatio (3)
      186, // OSWheels[2] - SlipRatio (4)
      195, // OSWheels[2] - TanSlipAngle (1)
      203, // OSWheels[2] - TanSlipAngle (2)
      1, // OSWheels[2] - TanSlipAngle (3)
      62, // OSWheels[2] - TanSlipAngle (4)

      65, // OSWheels[2] - SuspDeflect (1)
      185, // OSWheels[2] - SuspDeflect (2)
      186, // OSWheels[2] - SuspDeflect (3)
      60, // OSWheels[2] - SuspDeflect (4)
      166, // OSWheels[2] - Steer (1)
      175, // OSWheels[2] - Steer (2)
      171, // OSWheels[2] - Steer (3)
      189, // OSWheels[2] - Steer (4)
      255, // OSWheels[2] - XForce (1)
      218, // OSWheels[2] - XForce (2)
      119, // OSWheels[2] - XForce (3)
      67, // OSWheels[2] - XForce (4)
      9, // OSWheels[2] - YForce (1)
      13, // OSWheels[2] - YForce (2)
      223, // OSWheels[2] - YForce (3)
      193, // OSWheels[2] - YForce (4)
      232, // OSWheels[2] - VerticalLoad (1)
      240, // OSWheels[2] - VerticalLoad (2)
      138, // OSWheels[2] - VerticalLoad (3)
      65, // OSWheels[2] - VerticalLoad (4)
      217, // OSWheels[2] - AngVel (1)
      135, // OSWheels[2] - AngVel (2)
      122, // OSWheels[2] - AngVel (3)
      66, // OSWheels[2] - AngVel (4)
      43, // OSWheels[2] - LeanRelToRoad (1)
      2, // OSWheels[2] - LeanRelToRoad (2)
      72, // OSWheels[2] - LeanRelToRoad (2)
      61, // OSWheels[2] - LeanRelToRoad (4)
      40, // OSWheels[2] - AirTemp
      255, // OSWheels[2] - SlipFraction
      1, // OSWheels[2] - Touching
      0, // OSWheels[2] - Sp3
      54, // OSWheels[2] - SlipRatio (1)
      59, // OSWheels[2] - SlipRatio (2)
      55, // OSWheels[2] - SlipRatio (3)
      188, // OSWheels[2] - SlipRatio (4)
      95, // OSWheels[2] - TanSlipAngle (1)
      86, // OSWheels[2] - TanSlipAngle (2)
      7, // OSWheels[2] - TanSlipAngle (3)
      62, // OSWheels[2] - TanSlipAngle (4)

      45, // SteerTorque (1)
      155, // SteerTorque (2)
      16, // SteerTorque (3)
      195, // SteerTorque (4)
      0, // Spare (1)
      0, // Spare (2)
      0, // Spare (3)
      0, // Spare (4)
    ]);

    it('should unpack all data from a buffer into a packet instance', () => {
      const packet = new OutSimPack2(
        OutSimOptions.OSO_HEADER |
          OutSimOptions.OSO_ID |
          OutSimOptions.OSO_TIME |
          OutSimOptions.OSO_MAIN |
          OutSimOptions.OSO_INPUTS |
          OutSimOptions.OSO_DRIVE |
          OutSimOptions.OSO_DISTANCE |
          OutSimOptions.OSO_WHEELS |
          OutSimOptions.OSO_EXTRA_1,
      ).unpack(buffer);
      expect(packet.Header).toEqual('LFST');
      expect(packet.ID).toEqual(117769280);
      expect(packet.Time).toEqual(13040);
      expect(packet.OSMain.AngVel).toEqual([
        -0.017200227826833725, -0.00862264633178711, -0.005050004459917545,
      ]);
      expect(packet.OSMain.Heading).toEqual(-0.0000031447584660782013);
      expect(packet.OSMain.Pitch).toEqual(0.016919121146202087);
      expect(packet.OSMain.Roll).toEqual(-0.0010342481546103954);
      expect(packet.OSMain.Accel).toEqual([
        0.0002923994034063071, 0.0002195634733652696, 0.0019225140567868948,
      ]);
      expect(packet.OSMain.Vel).toEqual([
        -0.000010659444342309143, 0.000057880890381056815,
        0.00003301990363979712,
      ]);
      expect(packet.OSMain.Pos).toEqual([-45088775, -127795295, 137913]);
      expect(packet.OSInputs.Throttle).toEqual(0.7199969291687012);
      expect(packet.OSInputs.Brake).toEqual(0.1600061058998108);
      expect(packet.OSInputs.InputSteer).toEqual(0.30612504482269287);
      expect(packet.OSInputs.Clutch).toEqual(0.8552393913269043);
      expect(packet.OSInputs.Handbrake).toEqual(1);
      expect(packet.Gear).toEqual(3);
      expect(packet.Sp1).toEqual(0);
      expect(packet.Sp2).toEqual(0);
      expect(packet.Sp3).toEqual(0);
      expect(packet.EngineAngVel).toEqual(418.0706787109375);
      expect(packet.MaxTorqueAtVel).toEqual(345.3147277832031);
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      expect(packet.CurrentLapDist).toEqual(123.42727661132812);
      expect(packet.IndexedDistance).toEqual(122.71770477294922);
      expect(packet.OSWheels).toHaveLength(4);
      expect(packet.OSWheels[0].SuspDeflect).toEqual(0.09932190924882889);
      expect(packet.OSWheels[0].Steer).toEqual(-0.0034906587097793818);
      expect(packet.OSWheels[0].XForce).toEqual(4792.43310546875);
      expect(packet.OSWheels[0].YForce).toEqual(3517.847900390625);
      expect(packet.OSWheels[0].VerticalLoad).toEqual(4812.8447265625);
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      expect(packet.OSWheels[0].AngVel).toEqual(70.45999145507812);
      expect(packet.OSWheels[0].LeanRelToRoad).toEqual(0.02965652011334896);
      expect(packet.OSWheels[0].AirTemp).toEqual(40);
      expect(packet.OSWheels[0].SlipFraction).toEqual(255);
      expect(packet.OSWheels[0].Touching).toEqual(1);
      expect(packet.OSWheels[0].Sp3).toEqual(0);
      expect(packet.OSWheels[0].SlipRatio).toEqual(0.042349621653556824);
      expect(packet.OSWheels[0].TanSlipAngle).toEqual(0.12331584841012955);

      expect(packet.OSWheels[1].SuspDeflect).toEqual(0.05835996940732002);
      expect(packet.OSWheels[1].Steer).toEqual(0.0034906587097793818);
      expect(packet.OSWheels[1].XForce).toEqual(1615.66259765625);
      expect(packet.OSWheels[1].YForce).toEqual(2187.633056640625);
      expect(packet.OSWheels[1].VerticalLoad).toEqual(2249.45703125);
      expect(packet.OSWheels[1].AngVel).toEqual(70.70488739013672);
      expect(packet.OSWheels[1].LeanRelToRoad).toEqual(0.06496480852365494);
      expect(packet.OSWheels[1].AirTemp).toEqual(40);
      expect(packet.OSWheels[1].SlipFraction).toEqual(255);
      expect(packet.OSWheels[1].Touching).toEqual(1);
      expect(packet.OSWheels[1].Sp3).toEqual(0);
      expect(packet.OSWheels[1].SlipRatio).toEqual(0.09652107208967209);
      expect(packet.OSWheels[1].TanSlipAngle).toEqual(0.12215093523263931);

      expect(packet.OSWheels[2].SuspDeflect).toEqual(0.059646766632795334);
      expect(packet.OSWheels[2].Steer).toEqual(-0.08153775334358215);
      expect(packet.OSWheels[2].XForce).toEqual(5158.96240234375);
      expect(packet.OSWheels[2].YForce).toEqual(-359.7606506347656);
      expect(packet.OSWheels[2].VerticalLoad).toEqual(4863.2607421875);
      expect(packet.OSWheels[2].AngVel).toEqual(66.38816833496094);
      expect(packet.OSWheels[2].LeanRelToRoad).toEqual(0.028008343651890755);
      expect(packet.OSWheels[2].AirTemp).toEqual(40);
      expect(packet.OSWheels[2].SlipFraction).toEqual(198);
      expect(packet.OSWheels[2].Touching).toEqual(1);
      expect(packet.OSWheels[2].Sp3).toEqual(0);
      expect(packet.OSWheels[2].SlipRatio).toEqual(-0.0013274652883410454);
      expect(packet.OSWheels[2].TanSlipAngle).toEqual(0.12675385177135468);

      expect(packet.OSWheels[3].SuspDeflect).toEqual(0.022793414071202278);
      expect(packet.OSWheels[3].Steer).toEqual(-0.08383111655712128);
      expect(packet.OSWheels[3].XForce).toEqual(247.85545349121094);
      expect(packet.OSWheels[3].YForce).toEqual(-27.881364822387695);
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      expect(packet.OSWheels[3].VerticalLoad).toEqual(17.367630004882812);
      expect(packet.OSWheels[3].AngVel).toEqual(62.63266372680664);
      expect(packet.OSWheels[3].LeanRelToRoad).toEqual(0.048830192536115646);
      expect(packet.OSWheels[3].AirTemp).toEqual(40);
      expect(packet.OSWheels[3].SlipFraction).toEqual(255);
      expect(packet.OSWheels[3].Touching).toEqual(1);
      expect(packet.OSWheels[3].Sp3).toEqual(0);
      expect(packet.OSWheels[3].SlipRatio).toEqual(-0.011183550581336021);
      expect(packet.OSWheels[3].TanSlipAngle).toEqual(0.13216541707515717);
      expect(packet.SteerTorque).toEqual(-144.6061553955078);
      expect(packet.Spare).toEqual(0);
    });
  });
});
