import crypto from 'crypto';
import defaults from 'lodash/defaults';
import { TypedEmitter } from 'tiny-typed-emitter';

import { InSimError } from './errors';
import type { InSimEvents, InSimPacketEvents } from './InSimEvents';
import { unpack } from './lfspack';
import { log as baseLog } from './log';
import type { IS_ISI_Data, SendablePacket } from './packets';
import {
  InSimFlags,
  IS_ISI,
  IS_TINY,
  PacketType,
  packetTypeToClass,
  TinyType,
} from './packets';
import type { Protocol } from './protocols';
import { TCP, UDP } from './protocols';

const log = baseLog.extend('insim');

type InSimConnectionOptions = {
  Host: string;
  Port: number;
  Protocol?: 'TCP' | 'UDP';
};

export type InSimOptions = Omit<IS_ISI_Data, 'InSimVer'> &
  InSimConnectionOptions;

export class InSim extends TypedEmitter<InSimEvents> {
  /** Currently supported InSim version */
  static INSIM_VERSION = 9;

  /** A unique identifier of the InSim connection to a specific host */
  id: string;

  private _options: Required<InSimOptions> = defaultInSimOptions;

  /** The main connection to InSim (TCP or UDP) */
  private connection: Protocol | null = null;

  private sizeMultiplier = 4;

  constructor(id?: string) {
    super();

    this.id = id ?? crypto.randomUUID();

    this.on('connect', () =>
      log(`Connected to ${this._options.Host}:${this._options.Port}`),
    );
    this.on('disconnect', () => {
      this.connection = null;

      log(`Disconnected from ${this._options.Host}:${this._options.Port}`);
    });
    this.on(PacketType.ISP_TINY, this.handleKeepAlive);
  }

  /**
   * Connect to a server via InSim.
   */
  connect(
    options: Omit<Partial<IS_ISI_Data>, 'InSimVer'> & InSimConnectionOptions,
  ) {
    if (this.connection !== null) {
      log('Cannot connect - already connected');
      return;
    }

    this._connect(options);
  }

  /**
   * Connect to InSim Relay.
   *
   * After you are connected you can request a host list, so you can see
   * which hosts you can connect to.
   * Then you can send a packet to the Relay to select a host. After that
   * the Relay will send you all insim data from that host.
   *
   * Some hosts require a spectator password in order to be selectable.
   *
   * You do not need to specify a spectator password if you use a valid administrator password.
   *
   * If you connect with an administrator password, you can send just about every
   * regular InSim packet there is available in LFS, just like as if you were connected
   * to the host directly.
   *
   * Regular insim packets that a relay client can send to host:
   *
   * For anyone
   * TINY_VER
   * TINY_PING
   * TINY_SCP
   * TINY_SST
   * TINY_GTH
   * TINY_ISM
   * TINY_NCN
   * TINY_NPL
   * TINY_RES
   * TINY_REO
   * TINY_RST
   * TINY_AXI
   *
   * Admin only
   * TINY_VTC
   * ISP_MST
   * ISP_MSX
   * ISP_MSL
   * ISP_MTC
   * ISP_SCH
   * ISP_BFN
   * ISP_BTN
   *
   * The relay will also accept, but not forward
   * TINY_NONE    // for relay-connection maintenance
   */
  connectRelay() {
    this._connect(
      {
        Host: 'isrelay.lfs.net',
        Port: 47474,
        Protocol: 'TCP',
      },
      true,
    );
  }

  private _connect(
    options: Partial<IS_ISI_Data> & InSimConnectionOptions,
    isRelay = false,
  ) {
    this._options = defaults(options, defaultInSimOptions);

    log(
      `Connecting to ${this._options.Host}:${this._options.Port} using ${this._options.Protocol}...`,
    );

    this.sizeMultiplier = isRelay ? 1 : 4;

    this.connection =
      this._options.Protocol === 'TCP'
        ? new TCP(this._options.Host, this._options.Port, this.sizeMultiplier)
        : new UDP({
            host: this._options.Host,
            port: this._options.Port,
            packetSizeMultiplier: this.sizeMultiplier,
            socketInitialisationMode: 'connect',
          });
    this.connection.connect();
    this.connection.on('connect', () => {
      if (!isRelay) {
        this.send(
          new IS_ISI({
            Flags: this._options.Flags,
            Prefix: this._options.Prefix,
            Admin: this._options.Admin,
            UDPPort: this._options.UDPPort,
            ReqI: this._options.ReqI,
            Interval: this._options.Interval,
            IName: this._options.IName,
            InSimVer: InSim.INSIM_VERSION,
          }),
        );
      }
      this.emit('connect', this);
    });

    this.connection.on('disconnect', () => {
      this.emit('disconnect', this);
    });

    this.connection.on('error', (error: Error) => {
      throw new InSimError(
        `${this._options.Protocol} connection error: ${error.message}`,
      );
    });

    this.connection.on('data', (data) => this.handlePacket(data));
  }

  disconnect() {
    if (this.connection !== null) {
      log('Disconnecting...');
      this.connection.disconnect();
    }
  }

  send(packet: SendablePacket) {
    if (this.connection === null) {
      log('Cannot send a packet - not connected');
      return;
    }

    packet.SIZE_MULTIPLIER = this.sizeMultiplier;

    log('Send packet:', PacketType[packet.Type], packet);

    const data = packet.pack();

    this.connection.send(data);
  }

  get options(): InSimOptions {
    return this._options;
  }

  private async handlePacket(data: Uint8Array) {
    const header = unpack('<BB', data.buffer);

    if (!header) {
      log(`Incomplete packet header received: ${data.join()}`);
      return;
    }

    const packetType = header[1];

    const packetTypeString = PacketType[packetType as PacketType];

    if (packetTypeString === undefined) {
      log(`Unknown packet type received: ${packetType}`);
      return;
    }

    const PacketClass = packetTypeToClass[packetType as PacketType];

    if (PacketClass === undefined) {
      log(`Packet handler not found for ${packetTypeString}`);
      return;
    }

    const packetInstance = new PacketClass();
    packetInstance.SIZE_MULTIPLIER = this.sizeMultiplier;

    this.emit(
      packetType as keyof InSimPacketEvents,
      packetInstance.unpack(data) as never,
      this,
    );
  }

  private handleKeepAlive(packet: IS_TINY) {
    if (packet.SubT === TinyType.TINY_NONE) {
      this.send(
        new IS_TINY({
          SubT: TinyType.TINY_NONE,
        }),
      );
    }
  }
}

InSim.defaultMaxListeners = 255;

const defaultInSimOptions: Required<InSimOptions> = {
  Host: '127.0.0.1',
  Port: 29999,
  Protocol: 'TCP',
  ReqI: 0,
  UDPPort: 0,
  Flags: InSimFlags.ISF_RES_0,
  Prefix: '',
  Interval: 0,
  Admin: '',
  IName: '',
};
