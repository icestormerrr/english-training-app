import React, { useContext, useEffect, useState } from "react";
import MyInput from "../../ui/input/MyInput";
import MyButton from "../../ui/button/MyButton";
import WordCard from "../WordCard/WordCard";
import styles from "./WordExercise.module.css";
import { ScoreListContext } from "../../context";

const WordExercise = (props) => {
  // Контекст, в котором хранятся 5 лучших попыток
  const { scoreList, setScoreList } = useContext(ScoreListContext);
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = React.useState(60);

  // Логика работы таймера
  useEffect(() => {
    if (seconds > 0 && props.isCounting) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      saveResult();
      props.setIsCounting(false);
    }
  }, [seconds]);

  // Обработка результатов после окончания таймера
  function saveResult() {
    let newScoreList;
    // Если localStorage пустой и scoreList равен null
    if (!scoreList) {
      newScoreList = [{ score: score, date: Date.now() }];
    }
    // Если scoreList не заполнен до конца
    else if (scoreList.length < 5) {
      newScoreList = scoreList;
      newScoreList.push({ score: score, date: Date.now() });
      newScoreList.sort((a, b) => (a.score < b.score ? 1 : -1));
    }
    // Если scoreList заполнен
    else {
      newScoreList = scoreList;
      // Я храню последюю попытку в scoreList[5], если она не вошла в топ пять
      // Поэтому эту позицию нужно очищать
      if (scoreList.length === 6) {
        newScoreList.pop();
      }
      // Если лучше, хотя бы чем последний, значит заменяем последний на текущий и сортируем
      if (score > newScoreList.at(-1).score) {
        newScoreList.pop();
        newScoreList.push({ score: score, date: Date.now() });
        newScoreList.sort((a, b) => (a.score < b.score ? 1 : -1));
      } else {
        newScoreList.push({ score: score, date: Date.now() });
      }
    }
    setScoreList(newScoreList);
    localStorage.setItem(props.localStorageKey, JSON.stringify(scoreList));
  }

  // Логика игры
  function checkAnswer(event) {
    event.preventDefault();
    let tempInputValue = inputValue;
    tempInputValue = tempInputValue.trim().toLowerCase();
    if (currentIndex === props.words.length - 1) {
      saveResult();
      props.setIsCounting(false);
    } else if (tempInputValue === props.words[currentIndex].translate.toLowerCase()) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
    setInputValue("");
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <div className={styles.WordExercise}>
      <div className={styles.WordExerciseInfo}>
        <p>Время: {seconds}</p>
        <p>Счёт: {score}</p>
      </div>
      <WordCard words={props.words} currentIndex={currentIndex} />
      <form className={styles.WordExerciseForm}>
        <MyInput
          type="text"
          value={inputValue}
          placeholder="Введите перевод"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <MyButton onClick={(e) => checkAnswer(e)}>Подтвердить</MyButton>
      </form>
    </div>
  );
};

export default WordExercise;
