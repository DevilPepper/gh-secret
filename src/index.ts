import dotenv from 'dotenv';
import yargs from 'yargs';

import { hideBin } from 'yargs/helpers'

import { commands } from '~/cli';
import { middlewares, writeFile, Yarguments } from '~/helpers';
import {
  defaultSecretsFile,
  encrypt,
} from '~/store';

dotenv.config();

const argv: Yarguments = await yargs(hideBin(process.argv))
  .command(commands)
  .option("secrets-file", {
    alias: 'f',
    description: `Path to secrets file. Optionally export GH_SECRETS_FILE instead.` +
                 `Defaults to ${defaultSecretsFile} if neither are supplied`,
    type: 'string',
  })
  .help()
  .alias("help", 'h')
  .demandCommand(1, 1, "Must provide a command", "Only one command permitted")
  .middleware(middlewares)
  .argv;

const [command] = argv._ as string[];
if (["change", "delete", "init", "insert"].includes(command)) {
  const bytes = encrypt(argv.secrets ?? {}, argv.password ?? Buffer.alloc(0));
  await writeFile(argv.secretsFile ?? defaultSecretsFile, bytes);
}

// Now it's a module...
export {};
