import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers';

const insert: CommandModule = {
  command: `insert`,
  describe: `Inserts secrets to the secrets db`,
  builder: {
    secretNames: {
      alias: "s",
      description: "Secrets to add to the db",
      type: "array",
      demandOption: true,
    },
  },
  handler,
};

export function handler(argv: Yarguments) {

}

export default insert;
