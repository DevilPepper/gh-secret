import inquirer from 'inquirer';
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

export async function handler(argv: Yarguments) {
  const secretNames = argv.secretNames ?? [];
  const secrets = await inquirer.prompt(
    secretNames.map(secret => {
      return {
        name: secret,
        message: `Enter the value for ${secret}`,
        type: "password",
      };
    })
  );

  argv.secrets = {
    ...argv.secrets,
    ...secrets,
  }
}

export default insert;
