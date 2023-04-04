import {Struct} from "../packets";
import {array, byte, float, int, string, struct, unsigned} from "../decorators";
import {OutSimOptions} from "./OutSimOptions";
import {OutSimWheel} from "./OutSimWheel";
import {OutSimInputs} from "./OutSimInputs";
import {OutSimMain} from "./OutSimMain";

export class OutSimPack2 extends Struct {
  // if (OSOpts & OSO_HEADER)
  @string(4) Header = '';
  // if (OSOpts & OSO_ID)
  @int() ID = 0;
  // if (OSOpts & OSO_TIME)
  @unsigned() Time = 0;
  // if (OSOpts & OSO_MAIN)
  @struct(OutSimMain) OSMain = new OutSimMain();
  // if (OSOpts & OSO_INPUTS)
  @struct(OutSimInputs) OSInputs = new OutSimInputs();
  // if (OSOpts & OSO_DRIVE)
  @byte() Gear = 0;             // 0=R, 1=N, 2=first gear
  @byte() Sp1 = 0;              // spare
  @byte() Sp2 = 0;
  @byte() Sp3 = 0;
  @float() EngineAngVel = 0;    // radians/s
  @float() MaxTorqueAtVel = 0;  // Nm : output torque for throttle 1.0
  // if (OSOpts & OSO_DISTANCE)
  @float() CurrentLapDist = 0;  // m - travelled by car
  @float() IndexedDistance = 0; // m - track ruler measurement
  // if (OSOpts & OSO_WHEELS)
  @array(OutSimWheel, 4) OSWheels = Array.from(new Array(4)).map(_ => new OutSimWheel());	// array of structs - see above
  // if (OSOpts & OSO_EXTRA_1)
  @float() SteerTorque = 0;     // Nm : steering torque on front wheels (proportional to force feedback)
  @float() Spare = 0;           // spare
    
  private readonly OSOpts: number;

  constructor(outSimOpts: number) {
    super();
    this.OSOpts = outSimOpts;
  }

  public getValidPropertyNames(): string[] {
    // manually setting property names for dynamic LFS data based on OSOpts
    let validPropertyNames = [];

    if (this.OSOpts & OutSimOptions.OSO_HEADER) {
      validPropertyNames.push('Header');
    }

    if (this.OSOpts & OutSimOptions.OSO_ID) {
      validPropertyNames.push('ID');
    }

    if (this.OSOpts & OutSimOptions.OSO_TIME) {
      validPropertyNames.push('Time');
    }

    if (this.OSOpts & OutSimOptions.OSO_MAIN) {
      validPropertyNames.push('OSMain');
    }

    if (this.OSOpts & OutSimOptions.OSO_INPUTS) {
      validPropertyNames.push('OSInputs');
    }

    if (this.OSOpts & OutSimOptions.OSO_DRIVE) {
      validPropertyNames.push('Gear');
      validPropertyNames.push('Sp1');
      validPropertyNames.push('Sp2');
      validPropertyNames.push('Sp3');
      validPropertyNames.push('EngineAngVel');
      validPropertyNames.push('MaxTorqueAtVel');
    }

    if (this.OSOpts & OutSimOptions.OSO_DISTANCE) {
      validPropertyNames.push('CurrentLapDist');
      validPropertyNames.push('IndexedDistance');
    }

    if (this.OSOpts & OutSimOptions.OSO_WHEELS) {
      validPropertyNames.push('OSWheels');
    }

    if (this.OSOpts & OutSimOptions.OSO_EXTRA_1) {
      validPropertyNames.push('SteerTorque');
      validPropertyNames.push('Spare');
    }

    return validPropertyNames;
  }
}