import React from "react";
import styles from "./Exercise.module.css";
import WordExercise from "../../components/WordExercise/WordExercise";
const Exercise = ({ words }) => {
  return (
    <div className={styles.container}>
      <WordExercise words={words} />
    </div>
  );
};

export default Exercise;