import inquirer from 'inquirer';
import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers';

const init: CommandModule = {
  command: `init`,
  describe: `Initializes the secrets db with a Github PAT and password`,
  handler,
};

const tokenGen = "https://github.com/settings/tokens/new";

export async function handler(argv: Yarguments) {
  const { GITHUB_USER, GITHUB_TOKEN } = await inquirer.prompt([{
    name: "GITHUB_USER",
    message: "Enter your GitHub account name",
    type: "input",
  },
  {
    name: "GITHUB_TOKEN",
    message: `Get a token with full repo scope from here: ${tokenGen}`,
    type: "password",
  }
  ]);

  argv.secrets = {
    ...argv.secrets,
    GITHUB_USER,
    GITHUB_TOKEN,
  };
}

export default init;
