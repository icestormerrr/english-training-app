import React from 'react';
import styles from "./Exercise.module.css"
import {LOCAL_STORAGE_KEY} from "../../const";
import WordExercise from "../../components/WordExercise/WordExercise";
const Exercise = ({words, navigate}) => {
  return (
    <div className={styles.container}>
      <WordExercise
        navigate={navigate}
        words={words}
      />
    </div>
  );
};

export default Exercise;