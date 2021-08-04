import { Octokit } from '@octokit/rest'
import { Arguments } from 'yargs';

import { Secrets } from '~/store';

export type Yargs  = {
  secretsFile?: string;
  secretNames?: string[];
  topics?: string[];
}

export type AuthInfo = {
  secrets?: Secrets;
  password?: Buffer;
  gh?: Octokit;
}

export type Yarguments = Arguments<Yargs & AuthInfo>;
