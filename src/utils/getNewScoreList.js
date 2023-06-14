const getNewScoreList = (oldScoreList, currentScore) => {
  let newScoreList;
  // Если localStorage пустой и scoreList равен null
  if (!oldScoreList) {
    newScoreList = [{ score: currentScore, date: Date.now() }];
  }
  // Если scoreList не заполнен до конца
  else if (oldScoreList.length < 5) {
    newScoreList = oldScoreList;
    newScoreList.push({ score: currentScore, date: Date.now() });
    newScoreList.sort((a, b) => (a.score < b.score ? 1 : -1));
  }
  // Если scoreList заполнен
  else {
    newScoreList = oldScoreList;
    // Я храню последюю попытку в scoreList[5], если она не вошла в топ пять
    // Поэтому эту позицию нужно очищать
    if (oldScoreList.length === 6) {
      newScoreList.pop();
    }
    // Если лучше, хотя бы чем последний, значит заменяем последний на текущий и сортируем
    if (currentScore > newScoreList.at(-1).score) {
      newScoreList.pop();
      newScoreList.push({ score: currentScore, date: Date.now() });
      newScoreList.sort((a, b) => (a.score < b.score ? 1 : -1));
    } else {
      newScoreList.push({ score: currentScore, date: Date.now() });
    }
  }
  return newScoreList;
}

export default getNewScoreList;
