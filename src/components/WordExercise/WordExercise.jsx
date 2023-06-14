import React, { useContext, useEffect, useState } from "react";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import WordCard from "../WordCard/WordCard";
import styles from "./WordExercise.module.css";
import { ScoreListContext } from "../../context";
import getNewScoreList from "../../utils/getNewScoreList";

const WordExercise = ({words, isCounting, onEndOfExercise, localStorageKey}) => {
  // Контекст, в котором хранятся 5 лучших попыток
  const { scoreList, setScoreList } = useContext(ScoreListContext);
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = React.useState(60);

  // Логика работы таймера
  useEffect(() => {
    let timerId;
    if (seconds > 0 && isCounting) {
      timerId = setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      // Сохранение результатов
      setScoreList(getNewScoreList(scoreList, score));
      localStorage.setItem(localStorageKey, JSON.stringify(scoreList));
      onEndOfExercise(false);
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [seconds]);


  // Логика игры
  function checkAnswer(event) {
    event.preventDefault();
    let tempInputValue = inputValue;
    tempInputValue = tempInputValue.trim().toLowerCase();
    if (currentIndex === words.length - 1) {
      // Сохранение результатов
      setScoreList(getNewScoreList(scoreList, score));
      localStorage.setItem(localStorageKey, JSON.stringify(scoreList));
      onEndOfExercise(false);
    } else if (tempInputValue === words[currentIndex].translate.toLowerCase()) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
    setInputValue("");
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p>Время: {seconds}</p>
        <p>Счёт: {score}</p>
      </div>
      <WordCard word={words[currentIndex].word} />
      <form className={styles.form}>
        <Input
          type="text"
          value={inputValue}
          placeholder="Введите перевод"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={(e) => checkAnswer(e)}>Подтвердить</Button>
      </form>
    </div>
  );
};

export default WordExercise;
