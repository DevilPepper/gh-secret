import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers/Yarguments';

const get: CommandModule = {
  command: `get`,
  describe: `Retrieves secrets from the secrets db`,
  builder: {
    secretNames: {
      alias: "s",
      description: "Secrets to retrieve from the db",
      type: "array",
      demandOption: true,
    },
  },
  handler,
};

export function handler(argv: Yarguments) {

}

export default get;
