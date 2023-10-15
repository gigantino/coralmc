function isUsernameValid(username: string) {
  if (username.length < 3 || username.length > 16) {
    return false;
  }
  return /^[a-zA-Z0-9_]+$/.test(username);
}

type PlayerStats = {
  bedwars?: {
    level: number;
    experience: number;
    coins: number;
    kills: number;
    deaths: number;
    finalKills: number;
    finalDeaths: number;
    wins: number;
    losses: number;
    bedsBroken: number;
    winstreak: number;
    highestWinstreak: number;
    clan: string | null;
  };
  kitpvp?: {
    balance: number;
    kills: number;
    deaths: number;
    bounty: number;
    highestBounty: number;
    streak: number;
    highestStreak: number;
  };
};

interface Options {
  customUserAgent?: string;
}

function getHeaders(options?: Options) {
  if (options?.customUserAgent) {
    return {
      headers: {
        "User-Agent": options.customUserAgent,
      },
    };
  }
  return {};
}

export async function getPlayerStats(
  username: string,
  options?: Options,
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

type GlobalRank =
  | "OWNER"
  | "SRADMIN"
  | "ADMIN"
  | "SRDEV"
  | "DEV"
  | "JRDEV"
  | "SRMOD"
  | "MOD+"
  | "MOD"
  | "HELPER"
  | "HELPER"
  | "BUILDER"
  | "YOUTUBER"
  | "FAMOUS"
  | "STREAMER";

type BedwarsRank = "VIP" | "LEGEND" | "CHAMPION";

type KitpvpRank = "PRO" | "SPECIALIST" | "COMET" | "GOD" | "DIVINITY";

type PlayerInfo = {
  username: string;
  isBanned: boolean;
  ranks: {
    global?: GlobalRank;
    kitpvp?: KitpvpRank;
    bedwars?: BedwarsRank;
    raw: {
      global: string;
      kitpvp?: string;
      bedwars?: string;
    };
  };
};

function getFormattedRank(rawRank: string | undefined): string | null {
  if (!rawRank) return null;
  const formattedRank = rawRank.replace(/[^A-Z]/g, "");
  return formattedRank == "" ? null : formattedRank;
}

export async function getPlayerInfo(
  username: string,
  options?: Options,
): Promise<PlayerInfo | undefined> {
  if (!isUsernameValid(username)) return undefined;

  const data = await fetch(
    `https://api.coralmc.it/api/user/${username}/infos`,
    {
      ...getHeaders(options),
    },
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
