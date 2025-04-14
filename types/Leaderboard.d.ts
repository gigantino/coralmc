export type LeaderboardEntry = {
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

export type BedwarsLeaderboardType = "highest-winstreak" | "winstreak";
