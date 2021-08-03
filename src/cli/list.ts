import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers';

const list: CommandModule = {
  command: `list`,
  describe: `Lists available secret names`,
  handler,
};

export function handler(argv: Yarguments) {
  console.log(Object.keys(argv.secrets ?? {}));
}

export default list;
