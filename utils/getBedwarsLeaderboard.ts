import type {
  BedwarsLeaderboardType,
  LeaderboardEntry,
  RawLeaderboardEntry,
} from "../types/Leaderboard";
import type { Options } from "../types/Common";
import { getHeaders } from "./common";

export default async function getBedwarsLeaderboard(
  type: BedwarsLeaderboardType,
  options?: Options
): Promise<LeaderboardEntry[]> {
  const url = `https://api.coralmc.it/api/leaderboard/bedwars/${type}`;
  const response = await fetch(url, { ...getHeaders(options) });
  const rawJsonResponse = (await response.json()) as RawLeaderboardEntry[];
  return rawJsonResponse.map((player, i) => {
    return {
      position: i + 1,
      username: player.name,
      stats: {
        level: player.livello,
        kills: player.kills,
        deaths: player.deaths,
        bedsBroken: player.beds,
        wins: player.wins,
        winstreak: player.winstreak,
        highestWinstreak: player.highest_winstreak,
      },
      clan: player.clan,
    };
  });
}
