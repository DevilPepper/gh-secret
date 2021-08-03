import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers/Yarguments';

const init: CommandModule = {
  command: `init`,
  describe: `Initializes the secrets db with a Github PAT and password`,
  handler,
};

export function handler(argv: Yarguments) {

}

export default init;
