import path from 'path';

export const defaultSecretsFile = "./gh-secrets.json.aes";

export function getSecretsPath(yargs: { secretsFile?: string, [key: string]: unknown }): string {
  const secretsFile = yargs.secretsFile ?? process.env.GH_SECRETS_FILE ?? defaultSecretsFile;
  return path.resolve(secretsFile);
}
