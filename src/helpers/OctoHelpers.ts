import { Endpoints } from "@octokit/types";

import { sleep } from './Promised';
import { Yarguments } from './Yarguments';

export type SearchResults = Endpoints["GET /search/repositories"]["response"]["data"]["items"];
export async function search(argv: Yarguments, resultsHandler: (results: SearchResults) => Promise<void>) {
  const topics = (argv.topics ?? [])
    .map(t => `topic:${t}`)
    .join(' ');

  const q = `user:${argv.secrets?.["GITHUB_USER"]} ${topics} fork:true`;
  let page = 1;
  let per_page = 100;

  let promises: Promise<void>[] = [];
  do {
    if (headers?.['x-ratelimit-remaining'] === "0") {
      let currentTime = Math.floor(Date.now() / 1000);
      let resetTime = parseInt(headers?.['x-ratelimit-reset'] ?? `${currentTime + 60}`);
      promises.push(sleep((resetTime - currentTime) * 1000));
      await Promise.all(promises);
      promises = [];
    }

    var { data, headers } = await argv.gh?.request('GET /search/repositories', { q, per_page, page }) ?? {};
    var { total_count, items } = data ?? {};

    promises.push(resultsHandler(items ?? []));
  } while ((total_count ?? 0) > (per_page * page++));
  await Promise.all(promises);
}
