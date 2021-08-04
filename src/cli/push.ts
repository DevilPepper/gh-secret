import { Endpoints } from "@octokit/types";
import { CommandModule } from 'yargs';

import { search, SearchResults, sodiumEncrypt, Yarguments } from '~/helpers';

export type PublicKeyResponse = Endpoints["GET /repos/{owner}/{repo}/actions/secrets/public-key"]["response"]["data"];

const push: CommandModule = {
  command: `push`,
  aliases: [`put`],
  describe: `Sets the secrets to repos that match the topics`,
  builder: {
    secretNames: {
      alias: "s",
      description: "Secrets to add to the repos from the db",
      type: "array",
      demandOption: true,
    },
    topics: {
      alias: "t",
      description: "Repos that match all the provided topics will be edited",
      type: "array",
      demandOption: true,
    },
  },
  handler,
};

export async function handler(argv: Yarguments) {
  await search(argv, pushSecrets(argv));
}

export function pushSecrets(argv: Yarguments) {
  const secretTuples = (argv.secretNames ?? [])
    .filter(sn => !["GITHUB_USER", "GITHUB_TOKEN"].includes(sn))
    .map(name => [name, argv.secrets?.[name] ?? ""])
    .filter(([_, secret]) => secret);

  const owner = argv.secrets?.["GITHUB_USER"] ?? "";

  return async (results: SearchResults) => {
    const promises: Promise<unknown>[] = [];
    for (let result of results) {
      let repo = result.name;
      let resp = await argv.gh?.request('GET /repos/{owner}/{repo}/actions/secrets/public-key', { owner, repo });
      let { key, key_id } = resp?.data as PublicKeyResponse;

      let secrets = secretTuples
        .map(([secret_name, secret]) => {
          return {
            secret_name,
            encrypted_value: sodiumEncrypt(key, secret),
          }
        });

      for (let secret of secrets) {
        console.info(`${owner}/${repo}: Pushing ${secret.secret_name}`);
        promises.push(
          argv.gh?.request(
            'PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}',
            { owner, repo, ...secret, key_id }
          )
          ?? Promise.resolve()
        );
      }
    }
    await Promise.all(promises);
  };
}

export default push;
