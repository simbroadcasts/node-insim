import {
  array,
  byte,
  float,
  int,
  string,
  struct,
  unsigned,
} from '../decorators';
import { Struct } from '../packets';
import { OutSimInputs } from './OutSimInputs';
import { OutSimMain } from './OutSimMain';
import { OutSimOptions } from './OutSimOptions';
import { OutSimWheel } from './OutSimWheel';

export class OutSimPack2 extends Struct {
  // if (OSOpts & OSO_HEADER)
  /** Header of packet. Should be 'LFST' if OSOpts contains OSO_HEADER flag */
  @string(4) Header = '';

  // if (OSOpts & OSO_ID)
  /** OutSim ID from cfg.txt */
  @int() ID = 0;

  // if (OSOpts & OSO_TIME)
  /** time in milliseconds (to check order) */
  @unsigned() Time = 0;

  // if (OSOpts & OSO_MAIN)
  /** Vehicle position and velocity part */
  @struct(OutSimMain) OSMain = new OutSimMain();

  // if (OSOpts & OSO_INPUTS)
  /** Vehicle inputs part */
  @struct(OutSimInputs) OSInputs = new OutSimInputs();

  // if (OSOpts & OSO_DRIVE)
  /* 0=R, 1=N, 2=first gear */
  @byte() Gear = 0;
  /** spare */
  @byte() Sp1 = 0;
  /** spare */
  @byte() Sp2 = 0;
  /** spare */
  @byte() Sp3 = 0;
  /** radians/s */
  @float() EngineAngVel = 0;
  /** Nm : output torque for throttle 1.0 */
  @float() MaxTorqueAtVel = 0;

  // if (OSOpts & OSO_DISTANCE)
  /** m - travelled by car */
  @float() CurrentLapDist = 0;
  /** m - track ruler measurement */
  @float() IndexedDistance = 0;

  // if (OSOpts & OSO_WHEELS)
  /** Wheels data */
  @array(OutSimWheel, 4) OSWheels = Array.from(new Array(4)).map(
    () => new OutSimWheel(),
  );

  // if (OSOpts & OSO_EXTRA_1)
  /** Nm : steering torque on front wheels (proportional to force feedback) */
  @float() SteerTorque = 0;
  /** spare */
  @float() Spare = 0;

  private readonly OSOpts: number;

  constructor(outSimOpts: number) {
    super();
    this.OSOpts = outSimOpts;
  }

  public getValidPropertyNames(): string[] {
    // manually setting property names for dynamic LFS data based on OSOpts
    const validPropertyNames = [];

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
