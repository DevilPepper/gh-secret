import path from 'path';

export const defaultSecretsFile = "./gh-secrets.json.aes";

export function getSecretsPath(secretsFile?: string): string {
  return path.resolve(secretsFile ?? process.env.GH_SECRETS_FILE ?? defaultSecretsFile);
}
