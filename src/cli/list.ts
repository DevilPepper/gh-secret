import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers';

const list: CommandModule = {
  command: `list`,
  describe: `Lists available secret names`,
  handler,
};

export function handler(argv: Yarguments) {

}

export default list;
