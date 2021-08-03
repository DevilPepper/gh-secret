import { Arguments } from 'yargs';

import { Secrets } from '~/store';

export type Yargs  = {
  secretsFile?: string;
  secrets?: Secrets;
  secretNames?: string[];
  password?: Buffer;
  user?: string;
  topics?: string[];
}

export type Yarguments = Arguments<Yargs>;
