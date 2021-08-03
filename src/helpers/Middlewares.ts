// import { Octokit } from '@octokit/rest'
import inquirer from 'inquirer';

import {
  decrypt,
  defaultSecretsFile,
  getSecretsPath,
} from '~/store';
import { Yarguments } from './Yarguments';

import { exists, readFile} from './Promised';

export function normalizeSecretsPath(argv: Yarguments): Yarguments {
  return { ...argv, secretsFile: getSecretsPath(argv.secretsFile) };
}

export async function askForPassphrase(argv: Yarguments): Promise<Yarguments> {
  const [command] = argv._;
  const secretsFile = argv.secretsFile ?? defaultSecretsFile;
  if (command === "init" && await exists(secretsFile)) {
    throw `Can't init because ${secretsFile} already exists!`;
  }

  const { passphrase } = await inquirer.prompt({
    name: "passphrase",
    message: "Enter your passphrase",
    type: "password",
  });
  const password = Buffer.from(passphrase as string);
  argv.password = password;

  if (command === "init") {
    argv.secrets = {};
  } else {
    const fileBuffer = await readFile(secretsFile);
    argv.secrets = decrypt(fileBuffer, password);
  }
  return argv;
}

export function authenticate(argv: Yarguments): Yarguments {
  return argv;
}
