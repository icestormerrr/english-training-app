import React, { useContext, useState } from "react";
import Input from "../../ui/input/Input";
import Button from "../../ui/button/Button";
import WordCard from "../WordCard/WordCard";
import styles from "./WordExercise.module.css";
import { ScoreListContext } from "../../context";
import getNewScoreList from "../../utils/getNewScoreList";
import { LOCAL_STORAGE_KEY } from "../../const";
import CountDown from "../CountDown/CountDown";
import { useNavigate } from "react-router-dom";

const WordExercise = ({ words }) => {
  // Контекст, в котором хранятся 5 лучших попыток
  const { scoreList, setScoreList } = useContext(ScoreListContext);
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  function saveResult() {
    const newScoreList = getNewScoreList(scoreList, score);
    setScoreList(newScoreList);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newScoreList));
    navigate("/");
  }

  function checkAnswer(event) {
    event.preventDefault();
    let tempInputValue = inputValue.trim().toLowerCase();
    if (currentIndex === words.length - 1) {
      saveResult();
    } else if (tempInputValue === words[currentIndex].translate.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore((prevScore) => prevScore - 1);
    }
    setInputValue("");
    setCurrentIndex((prevCurrentIndex) => prevCurrentIndex + 1);
  }

  // Костыль?
  window.onload = function() {
    let loaded = sessionStorage.getItem('loaded');
    if(loaded) {
      navigate("/")
    } else {
      sessionStorage.setItem('loaded', true);
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p>
          Время: <CountDown seconds={60} onEndCounting={saveResult} />
        </p>
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
        <Button onClick={checkAnswer}>Подтвердить</Button>
      </form>
    </div>
  );
};

export default WordExercise;
