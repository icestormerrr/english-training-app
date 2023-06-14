import React from "react";
import styles from "./ScoreItem.module.css"
const ScoreItem = ({place, result, date}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{place} </div>
      <div className={styles.content}>{result} </div>
      <div className={styles.content}>{date}</div>
    </div>
  );
};

export default ScoreItem;