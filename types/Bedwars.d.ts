export type BedwarsStats = {
  id_player: number;
  kills: number;
  wins: number;
  deaths: number;
  coins: number;
  final_kills: number;
  final_deaths: number;
  beds_broken: number;
  played: number;
  winstreak: number;
  h_winstreak: number;
  level: number;
  level_rank: number;
  total_players: number;
  current_division: number;
  current_division_exp: number;
  past_divisions: string;
  clan_role: string | null;
  clan_name: string | null;
  clan_id: number | null;
  losses: number;
};

export type BedwarsMatch = {
  match_id: number;
  match_start: string;
  match_end: string;
  match_duration_seconds: number;
  arena_name: string;
  match_type_name: string;
  player_team_name: string;
  winning_team_name: string;
  match_outcome: string;
};

export type BedwarsMatchDetail = {
  match_id: number;
  server_id: number;
  match_number_on_server: number;
  start_time: string;
  end_time: string;
  duration_seconds: number;
  arena_name: string;
  type_name: string;
  winning_team_name: string;
  per_player_stats: BedwarsPlayerMatchStats[];
};

export type BedwarsPlayerMatchStats = {
  username: string;
  team_name: string;
  damage_dealt: number;
  damage_taken: number;
  match_outcome: string;
  kills: number;
  final_kills: number;
  deaths: number;
  beds_broken: number;
  score: number;
  kd: string;
};
