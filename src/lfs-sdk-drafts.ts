import { PacketType } from 'node-insim/packets';
import { TypedEmitter } from 'tiny-typed-emitter';

import { InSim } from './InSim';

const app = createApp();

app.players.on('join', (player) => {
  console.log(`${player.nickname} left the pits`);

  player.sendMessage('You have left the pits'); // player may have spectated at this point
});

type Player = {
  id: number;
  nickname: string;
  sendMessage: (message: string) => void;
};

type PlayerEvents = {
  join: (player: Player) => void;
};

class Players extends TypedEmitter<PlayerEvents> {
  private players: number[] = [];

  constructor(private inSim: InSim) {
    super();

    inSim.on(PacketType.ISP_NPL, (packet) => {
      this.players.push(packet.PLID);
    });
  }
}

function createApp({ inSim }: { inSim: InSim } = { inSim: new InSim() }) {
  const players = new Players(inSim);

  return {
    players,
  };
}
