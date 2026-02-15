import { TypedEmitter } from 'tiny-typed-emitter';

type Events = {
  connect: () => void;
  disconnect: () => void;
  data: (data: Uint8Array<ArrayBuffer>) => void;
  error: (error: Error) => void;
  timeout: () => void;
};

interface ProtocolOptions {
  host: string;
  port: number;
  packetSizeMultiplier?: number;
}

/** @internal */
export abstract class Protocol extends TypedEmitter<Events> {
  protected readonly host: string;
  protected readonly port: number;
  protected readonly packetSizeMultiplier: number;

  protected constructor({
    host,
    port,
    packetSizeMultiplier = 1,
  }: ProtocolOptions) {
    super();
    this.host = host;
    this.port = port;
    this.packetSizeMultiplier = packetSizeMultiplier;
  }

  abstract connect(): void;
  abstract disconnect(): void;
  abstract send(data: Uint8Array<ArrayBuffer>): void;
}
