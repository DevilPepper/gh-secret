import { CommandModule } from 'yargs';

import { search, SearchResults, Yarguments } from '~/helpers';

const del: CommandModule = {
  command: `delete`,
  describe: `Deletes secrets from matching repositories`,
  builder: {
    secretNames: {
      alias: "s",
      description: "Secrets to remove from the repos",
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
  await search(argv, deleteSecrets(argv));
}

export function deleteSecrets(argv: Yarguments) {
  const secretNames = (argv.secretNames ?? [])
    .filter(sn => !["GITHUB_USER", "GITHUB_TOKEN"].includes(sn))
  const owner = argv.secrets?.["GITHUB_USER"] ?? "";

  return async (results: SearchResults) => {
    const promises: Promise<unknown>[] = [];
    for (let result of results) {
      let repo = result.name;
      var resp = await argv.gh?.request('GET /repos/{owner}/{repo}/actions/secrets', { owner, repo });
      let secrets = (resp?.data?.secrets ?? [])
        .map(s => s.name)
        .filter(s => secretNames.includes(s));

      for(let secret_name of secrets) {
        console.info(`${owner}/${repo}: Deleting ${secret_name}`);
        promises.push(
          argv.gh?.request(
            'DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}',
            { owner, repo, secret_name }
          )
          ?? Promise.resolve()
        );
      }
    }
    await Promise.all(promises);
  }
}

export default del;
