import { CommandModule } from 'yargs';

import { Yarguments } from '~/helpers';

const get: CommandModule = {
  command: `get`,
  describe: `Retrieves secrets from the secrets db`,
  builder: {
    secretNames: {
      alias: "s",
      description: "Secrets to retrieve from the db",
      type: "array",
      demandOption: true,
    },
  },
  handler,
};

export function handler(argv: Yarguments) {
  const secretNames = argv.secretNames ?? [];
  const secrets = secretNames.reduce((acc, curr) => {
    return {
      ...acc,
      ...{ [curr]: argv.secrets?.[curr] }
    };
  }, {});

  console.log(secrets);
}

export default get;
