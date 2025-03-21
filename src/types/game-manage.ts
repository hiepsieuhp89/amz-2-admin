// types.ts
export interface GamePeriod {
    id: string;
    startTime: string;
    endTime: string;
    result?: number[];
}

export interface CurrentGame extends GamePeriod {
    totalBet: number;
    totalWin: number;
    playerCount: number;
    colorStats: {
      green: number;
      purple: number;
      red: number;
    };
    numberStats: number[];
    betStats: {
      xanh: number;
      tho: number;
      tongDat: number;
      lenNho: number;
      nho: number;
      tongDai: number;
    };
  }

export interface FutureGame extends GamePeriod {
    canBet: boolean;
}

export interface RecentGame {
    id: string;
    totalBet: number;
    winningNumber: number;
    payout: number;
    startTime: string;
    endTime: string;
  }

export type wingoGameType = 'wingo' | 'wingo1' | 'wingo3' | 'wingo5'

export type k3GameType = 'k31p' | 'k33p' | 'k35p' | 'k310p'