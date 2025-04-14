import type { Options } from "../types/Options";
import type { PlayerInfo } from "../types/Player";
import type { BedwarsRank, GlobalRank, KitpvpRank } from "../types/Ranks";
import { getFormattedRank, getHeaders, isUsernameValid } from "./common";

export default async function getPlayerInfo(
  username: string,
  options?: Options
): Promise<PlayerInfo | undefined> {
  if (!isUsernameValid(username)) return undefined;

  const data = await fetch(
    `https://api.coralmc.it/api/user/${username}/infos`,
    {
      ...getHeaders(options),
    }
  );
  const json = await data.json();

  if (!json.username) return undefined;

  return {
    username: json.username,
    isBanned: json.isBanned,
    ranks: {
      global: getFormattedRank(json.globalRank) as GlobalRank,
      bedwars: getFormattedRank(json.vipBedwars) as BedwarsRank,
      kitpvp: getFormattedRank(json.vipKitpvp) as KitpvpRank,
      raw: {
        global: json.globalRank,
        bedwars: json.vipBedwars,
        kitpvp: json.vipKitpvp,
      },
    },
  };
}
