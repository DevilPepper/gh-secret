import inquirer from 'inquirer';
import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers';

const change: CommandModule = {
  command: `change`,
  describe: `Change the master password(Needs current password to decrypt)`,
  handler,
};

export async function handler(argv: Yarguments) {
  const { passphrase } = await inquirer.prompt({
    name: "passphrase",
    message: "Enter your new passphrase",
    type: "password",
  });
  const password = Buffer.from(passphrase as string);
  argv.password = password;
}

export default change;
