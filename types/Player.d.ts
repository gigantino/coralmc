export type PlayerInfoResponse = {
  username: string;
  joinDate: number;
  lastSeen: number;
  isOnline: boolean;
  isBanned: boolean;
  isStaff: boolean;
  isVip: boolean;
};

export type PlayerSearchCompletion = string[];
