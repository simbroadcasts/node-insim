import EventEmitter from 'events';
import net from 'net';

export class TCP extends EventEmitter {
  private stream: net.Socket = null;

  private readonly host: string;
  private readonly port: number;

  // Temp buffer
  tempBuf: Buffer = null;

  constructor(host: string, port: number) {
    super();
    this.host = host;
    this.port = port;
  }

  connect = () => {
    this.stream = net.connect(this.port, this.host);

    this.stream.on('connect', () => {
      console.log('TCP connected');
      this.emit('connect', this);
    });

    this.stream.on('close', () => {
      console.log('TCP disconnected');
      this.emit('disconnect', this);
    });

    this.stream.on('data', (data: string) => {
      console.log('TCP received data: ' + data);

      // Set or append to temp buffer
      if (this.tempBuf === null) {
        this.tempBuf = Buffer.from(data, 'binary');
      } else {
        this.tempBuf = Buffer.concat([
          this.tempBuf,
          Buffer.from(data, 'binary'),
        ]);
      }
      // this.tempBuf.length += data.length;
      this.processBuf();
    });
  };

  send = (data: Uint8Array | string) => {
    this.stream.write(data);
  };

  disconnect = () => {
    this.stream.end();
  };

  processBuf() {
    if (this.tempBuf.length < 4) {
      console.log('processBuf: Got packet with <4 bytes');
      return; // Haven't got a full 32 bit header
    }

    const size = this.tempBuf[0] * 4;

    // If SizeLarge
    if (this.tempBuf.length === size) {
      // We have at least one full packet
      this.emit('packet', this.tempBuf);

      this.tempBuf = null;
    } else if (this.tempBuf.length > size) {
      // Process first packet...
      this.emit('packet', this.tempBuf.slice(0, size));
      this.tempBuf = this.tempBuf.slice(size, this.tempBuf.length);
      // Recurse on remaining buffer
      this.processBuf();
    } else {
      console.log('processBuf: Got incomplete LFS packet');
    }
  }
}
