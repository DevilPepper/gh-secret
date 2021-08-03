import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers';

const remove: CommandModule = {
  command: `remove`,
  describe: `Removes secrets from the secrets db`,
  builder: {
    secretNames: {
      alias: "s",
      description: "Secrets to remove from the db",
      type: "array",
      demandOption: true,
    },
  },
  handler,
};

export function handler(argv: Yarguments) {

}

export default remove;
