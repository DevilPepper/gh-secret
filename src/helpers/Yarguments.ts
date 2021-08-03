import { Arguments } from 'yargs';

export type Yargs  = {
  secretsFile?: string;
  secrets?: {};
  secretNames?: string[];
  password?: Buffer;
  user?: string;
  topics?: string[];
}

export type Yarguments = Arguments<Yargs>;
