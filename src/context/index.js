import { createContext } from "react";

export const AppContext = createContext({
  words: [],
  scoreList: [],
  setScoreList: () => {},
});