import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers';

const del: CommandModule = {
  command: `delete`,
  describe: `Deletes secrets from matching repositories`,
  builder: {
    secretNames: {
      alias: "s",
      description: "Secrets to remove from the repos",
      type: "array",
      demandOption: true,
    },
    topics: {
      alias: "t",
      description: "Repos that match all the provided topics will be edited",
      type: "array",
      demandOption: true,
    },
  },
  handler,
};

export function handler(argv: Yarguments) {

}

export default del;
