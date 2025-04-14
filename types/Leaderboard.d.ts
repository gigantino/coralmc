export type RawLeaderboardEntry = {
  name: string;
  livello: number;
  kills: number;
  deaths: number;
  beds: number;
  wins: number;
  clan: string | null;
  winstreak: number;
  highest_winstreak: number;
  kdr: string;
};

export type LeaderboardEntry = {
  position: number;
  username: string;
  stats: {
    level: number;
    kills: number;
    deaths: number;
    bedsBroken: number;
    wins: number;
    winstreak: number;
    highestWinstreak: number;
  };
  clan: string | null;
};

export type BedwarsLeaderboardType = "highest-winstreak" | "winstreak";
