import type { Options } from "../types/Options";
import type { PlayerStats } from "../types/Player";
import { getHeaders, isUsernameValid } from "./common";

export default async function getPlayerStats(
  username: string,
  options?: Options
): Promise<PlayerStats | undefined> {
  if (!isUsernameValid(username)) return undefined;
  const data = await fetch(`https://api.coralmc.it/api/user/${username}`, {
    ...getHeaders(options),
  });
  const json = await data.json();

  const { bedwars, kitpvp } = json;

  return {
    bedwars:
      bedwars && bedwars.name
        ? {
            level: bedwars.level,
            experience: bedwars.exp,
            coins: bedwars.coins,
            kills: bedwars.kills,
            deaths: bedwars.deaths,
            finalKills: bedwars.final_kills,
            finalDeaths: bedwars.final_deaths,
            wins: bedwars.wins,
            losses: bedwars.played - bedwars.wins,
            bedsBroken: bedwars.beds_broken,
            winstreak: bedwars.winstreak,
            highestWinstreak: bedwars.h_winstreak,
            clan: bedwars.clan || null,
          }
        : undefined,
    kitpvp:
      kitpvp && kitpvp.displayName
        ? {
            balance: kitpvp.balance,
            kills: kitpvp.kills,
            deaths: kitpvp.deaths,
            bounty: kitpvp.bounty,
            highestBounty: kitpvp.topBounty,
            streak: kitpvp.streak,
            highestStreak: kitpvp.topstreak,
          }
        : undefined,
  };
}
