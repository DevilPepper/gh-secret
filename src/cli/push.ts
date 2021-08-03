import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers/Yarguments';

const push: CommandModule = {
  command: `push`,
  aliases: [`put`],
  describe: `Sets the secrets to repos that match the topics`,
  builder: {
    secretNames: {
      alias: "s",
      description: "Secrets to add to the repos from the db",
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

export default push;
