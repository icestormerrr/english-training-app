import { TOP_RESULT_COUNT } from "../const";

const getNewScoreList = (oldScoreList, currentScore) => {
  let newScoreList = Boolean(oldScoreList) ? oldScoreList : [];

  // Я храню последюю попытку в scoreList[5], если она не вошла в топ пять
  if (newScoreList.length === TOP_RESULT_COUNT + 1) {
    newScoreList.pop(); // очищаем последнюю неудачную попытку
  }
  // Проверяем войдёт ли в топ 5
  if (currentScore > newScoreList.at(-1)?.score && newScoreList.length === TOP_RESULT_COUNT) {
    newScoreList.pop();
  }
  newScoreList.push({ score: currentScore, date: Date.now() });
  newScoreList.sort((a, b) => (a.score < b.score ? 1 : -1));
  return newScoreList;
};

export default getNewScoreList;
