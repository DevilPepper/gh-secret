// import { Octokit } from '@octokit/rest'

import {
  // decrypt,
  getSecretsPath,
} from '~/store';
import { Yarguments } from './Yarguments';

export function normalizeSecretsPath(argv: Yarguments): Yarguments {
  return { ...argv, secretsFile: getSecretsPath(argv.secretsFile) };
}

export function askForPassphrase(argv: Yarguments): Yarguments {
  return argv;
}

export function authenticate(argv: Yarguments): Yarguments {
  return argv;
}
