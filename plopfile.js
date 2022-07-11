module.exports = function (plop) {
  plop.setHelper('ifEquals', function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  });
  plop.setHelper('ifNotEquals', function (arg1, arg2, options) {
    return arg1 != arg2 ? options.fn(this) : options.inverse(this);
  });
  plop.setGenerator('packet', {
    description: 'InSim packet',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Packet name without "IS_" (e.g. BTN)',
      },
      {
        type: 'input',
        name: 'size',
        message: 'Packet size in bytes',
      },
      {
        type: 'list',
        name: 'variant',
        choices: ['instruction', 'info', 'both ways'],
        message: 'Is the packet sendable / receivable / both?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/packets/IS_{{name}}.ts',
        templateFile: 'generators/packet.hbs',
      },
      {
        type: 'add',
        path: 'src/packets/__tests__/IS_{{name}}.test.ts',
        templateFile: 'generators/packet-test.hbs',
      },
      {
        type: 'append',
        path: 'src/packets/index.ts',
        templateFile: 'generators/packet-index.hbs',
      },
      {
        type: 'append',
        path: 'src/packets/enums/PacketType.ts',
        pattern: 'export enum PacketType {',
        template: `  /* * TODO move it to the correct enum position */
        ISP_{{ name }},
      `,
      },
      {
        type: 'append',
        path: 'src/protocols/InSim/InSimEvents.ts',
        pattern: 'export type InSimPacketEvents = {',
        template: `  [PacketType.ISP_{{ name }}]: (packet: IS_{{ name }}, inSim: InSim) => void;`,
      },
      {
        type: 'modify',
        path: 'src/protocols/InSim/InSimEvents.ts',
        pattern: "} from '../../packets';",
        template: `  IS_{{ name }},
} from '../../packets';`,
      },
    ],
  });
};
