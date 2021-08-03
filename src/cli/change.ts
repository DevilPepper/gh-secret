import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers/Yarguments';

const change: CommandModule = {
  command: `change`,
  describe: `Change the master password(Needs current password to decrypt)`,
  handler,
};

export function handler(argv: Yarguments) {

}

export default change;
