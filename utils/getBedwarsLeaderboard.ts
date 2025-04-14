import type {
  BedwarsLeaderboardType,
  LeaderboardEntry,
} from "../types/Leaderboard";
import type { Options } from "../types/Options";
import { getHeaders } from "./common";

export default async function getBedwarsLeaderboard(
  type: BedwarsLeaderboardType,
  options?: Options
): Promise<LeaderboardEntry[]> {
  const url = `https://api.coralmc.it/api/leaderboard/bedwars/${type}`;
  const response = await fetch(url, { ...getHeaders(options) });
  const json = await response.json();
  return json as LeaderboardEntry[];
}
