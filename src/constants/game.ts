import { k3GameType, wingoGameType } from "@/types/game-manage";

export const defaultGame: { type: wingoGameType; value: number }[] = [
    { type: "wingo", value: 30000 },
    { type: "wingo1", value: 60000 },
    { type: "wingo3", value: 180000 },
    { type: "wingo5", value: 300000 },
  ];


  export const defaultGameK3: { type: k3GameType; value: number }[] = [
    { type: "k31p", value: 60000 },
    { type: "k33p", value: 180000 },
    { type: "k35p", value: 300000 },
    { type: "k310p", value: 600000 },
  ];