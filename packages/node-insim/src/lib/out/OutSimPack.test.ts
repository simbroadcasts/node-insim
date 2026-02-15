import { OutSimPack } from './OutSimPack';

describe('OutSimPack', () => {
  describe('without OutSim ID', () => {
    const buffer = new Uint8Array([
      240, // Time (1)
      50, // Time (2)
      0, // Time (3)
      0, // Time (4)
      155, // AngVelX (1)
      155, // AngVelX (2)
      12, // AngVelX (3)
      60, // AngVelX (4)
      180, // AngVelY (1)
      252, // AngVelY (2)
      109, // AngVelY (3)
      188, // AngVelY (4)
      149, // AngVelZ (1)
      60, // AngVelZ (2)
      47, // AngVelZ (3)
      60, // AngVelZ (4)
      23, // Heading (1)
      119, // Heading (2)
      134, // Heading (3)
      62, // Heading (4)
      9, // Pitch (1)
      32, // Pitch (2)
      225, // Pitch (3)
      60, // Pitch (4)
      84, // Roll (1)
      42, // Roll (2)
      63, // Roll (3)
      186, // Roll (4)
      118, // AccelX (1)
      69, // AccelX (2)
      154, // AccelX (3)
      191, // AccelX (4)
      150, // AccelY (1)
      84, // AccelY (2)
      136, // AccelY (3)
      64, // AccelY (4)
      148, // AccelZ (1)
      155, // AccelZ (2)
      51, // AccelZ (3)
      62, // AccelZ (4)
      64, // VelX (1)
      200, // VelX (2)
      128, // VelX (3)
      192, // VelX (4)
      21, // VelY (1)
      143, // VelY (2)
      111, // VelY (3)
      65, // VelY (4)
      106, // VelZ (1)
      9, // VelZ (2)
      193, // VelZ (3)
      187, // VelZ (4)
      35, // PosX (1)
      134, // PosX (2)
      62, // PosX (3)
      253, // PosX (4)
      166, // PosY (1)
      226, // PosY (2)
      163, // PosY (3)
      248, // PosY (4)
      42, // PosZ (1)
      26, // PosZ (2)
      2, // PosZ (3)
      0, // PosZ (4)
    ]);

    it('should unpack data from a buffer into a packet instance', () => {
      const packet = new OutSimPack().unpack(buffer);
      expect(packet.Time).toEqual(13040);
      expect(packet.AngVelX).toEqual(0.008582021109759808);
      expect(packet.AngVelY).toEqual(-0.014525581151247025);
      expect(packet.AngVelZ).toEqual(0.010695596225559711);
      expect(packet.Heading).toEqual(0.26262733340263367);
      expect(packet.Pitch).toEqual(0.027481095865368843);
      expect(packet.Roll).toEqual(-0.0007292379159480333);
      expect(packet.AccelX).toEqual(-1.205244779586792);
      expect(packet.AccelY).toEqual(4.2603254318237305);
      expect(packet.AccelZ).toEqual(0.17539817094802856);
      expect(packet.VelX).toEqual(-4.024444580078125);
      expect(packet.VelY).toEqual(14.972432136535645);
      expect(packet.VelZ).toEqual(-0.005891014821827412);
      expect(packet.PosX).toEqual(-46234077);
      expect(packet.PosY).toEqual(-123477338);
      expect(packet.PosZ).toEqual(137770);
      expect(packet.ID).toEqual(0);
    });
  });

  describe('with OutSim ID', () => {
    const buffer = new Uint8Array([
      240, // Time (1)
      50, // Time (2)
      0, // Time (3)
      0, // Time (4)
      155, // AngVelX (1)
      155, // AngVelX (2)
      12, // AngVelX (3)
      60, // AngVelX (4)
      180, // AngVelY (1)
      252, // AngVelY (2)
      109, // AngVelY (3)
      188, // AngVelY (4)
      149, // AngVelZ (1)
      60, // AngVelZ (2)
      47, // AngVelZ (3)
      60, // AngVelZ (4)
      23, // Heading (1)
      119, // Heading (2)
      134, // Heading (3)
      62, // Heading (4)
      9, // Pitch (1)
      32, // Pitch (2)
      225, // Pitch (3)
      60, // Pitch (4)
      84, // Roll (1)
      42, // Roll (2)
      63, // Roll (3)
      186, // Roll (4)
      118, // AccelX (1)
      69, // AccelX (2)
      154, // AccelX (3)
      191, // AccelX (4)
      150, // AccelY (1)
      84, // AccelY (2)
      136, // AccelY (3)
      64, // AccelY (4)
      148, // AccelZ (1)
      155, // AccelZ (2)
      51, // AccelZ (3)
      62, // AccelZ (4)
      64, // VelX (1)
      200, // VelX (2)
      128, // VelX (3)
      192, // VelX (4)
      21, // VelY (1)
      143, // VelY (2)
      111, // VelY (3)
      65, // VelY (4)
      106, // VelZ (1)
      9, // VelZ (2)
      193, // VelZ (3)
      187, // VelZ (4)
      35, // PosX (1)
      134, // PosX (2)
      62, // PosX (3)
      253, // PosX (4)
      166, // PosY (1)
      226, // PosY (2)
      163, // PosY (3)
      248, // PosY (4)
      42, // PosZ (1)
      26, // PosZ (2)
      2, // PosZ (3)
      0, // PosZ (4)
      64, // ID (1)
      4, // ID (2)
      3, // ID (3)
      1, // ID (4)
    ]);

    it('should unpack data from a buffer into a packet instance', () => {
      const packet = new OutSimPack().unpack(buffer);
      expect(packet.Time).toEqual(13040);
      expect(packet.AngVelX).toEqual(0.008582021109759808);
      expect(packet.AngVelY).toEqual(-0.014525581151247025);
      expect(packet.AngVelZ).toEqual(0.010695596225559711);
      expect(packet.Heading).toEqual(0.26262733340263367);
      expect(packet.Pitch).toEqual(0.027481095865368843);
      expect(packet.Roll).toEqual(-0.0007292379159480333);
      expect(packet.AccelX).toEqual(-1.205244779586792);
      expect(packet.AccelY).toEqual(4.2603254318237305);
      expect(packet.AccelZ).toEqual(0.17539817094802856);
      expect(packet.VelX).toEqual(-4.024444580078125);
      expect(packet.VelY).toEqual(14.972432136535645);
      expect(packet.VelZ).toEqual(-0.005891014821827412);
      expect(packet.PosX).toEqual(-46234077);
      expect(packet.PosY).toEqual(-123477338);
      expect(packet.PosZ).toEqual(137770);
      expect(packet.ID).toEqual(16974912);
    });
  });
});
