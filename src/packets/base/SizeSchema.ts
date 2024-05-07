import type { ISerialInput, ISerialOutput } from 'typed-binary';
import { ByteSchema } from 'typed-binary';

class SizeSchema extends ByteSchema {
  private readonly sizeMultiplier: number;

  constructor(sizeMultiplier = 1) {
    super();
    this.sizeMultiplier = sizeMultiplier;
  }

  read(input: ISerialInput) {
    return input.readByte() * this.sizeMultiplier;
  }

  write(output: ISerialOutput, value: number) {
    output.writeByte(value / this.sizeMultiplier);
  }
}

export const size = (sizeMultiplier: number) => new SizeSchema(sizeMultiplier);
