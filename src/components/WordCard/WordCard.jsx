import React from "react";
import styles from "./WordCard.module.css"
const WordCard = ({word}) => {
  return (
    <div className={styles.card}>
      {word}
    </div>
  );
};

export default WordCard;