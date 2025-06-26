export type KitpvpStats = {
  player_id: number;
  balance: number;
  overall_kills: number;
  overall_deaths: number;
  overall_killstreak: number;
  overall_max_killstreak: number;
  bounty: string;
  max_bounty: string;
  gang_name: string | null;
  gang_rank_name: string | null;
};
