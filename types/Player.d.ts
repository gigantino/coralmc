export type PlayerStats = {
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

export type PlayerInfo = {
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
