import dotenv from 'dotenv';
import yargs from 'yargs';

import { hideBin } from 'yargs/helpers'

import { commands } from '~/cli';
import { middlewares } from '~/helpers';
import {
  defaultSecretsFile,
  // encrypt,
 } from '~/store';

dotenv.config();

const argv = yargs(hideBin(process.argv))
  .demandCommand()
  .command(commands)
  .option("secrets-file", {
    alias: 'f',
    description: `Path to secrets file. Optionally export GH_SECRETS_FILE instead.` +
                 `Defaults to ${defaultSecretsFile} if neither are supplied`,
    type: 'string',
  })
  .help()
  .alias("help", 'h')
  .middleware(middlewares)
  .argv;
