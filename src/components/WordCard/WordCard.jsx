import React from "react";
import styles from "./WordCard.module.css"
const WordCard = (props) => {
  return (
    <div className={styles.WordCard}>
      {props.words[props.currentIndex].word}
    </div>
  );
};

export default WordCard;