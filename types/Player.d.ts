interface BasePlayerInfo {
  username: string;
  joinDate: number;
  isBanned: boolean;
  isStaff: boolean;
  isVip: boolean;
}

export type PlayerInfoResponse =
  | (BasePlayerInfo & {
      lastSeen: number;
      isOnline: false;
    })
  | (BasePlayerInfo & {
      lastServer: string;
      isOnline: true;
    });

export type PlayerSearchCompletion = string[];
