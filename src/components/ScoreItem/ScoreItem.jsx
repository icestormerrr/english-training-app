import React from "react";
import styles from "./ScoreItem.module.css"
const ScoreItem = (props) => {
  return (
    <div className={styles.ScoreItem}>
      <div className={styles.ScoreItemContent}>{props.place} </div>
      <div className={styles.ScoreItemContent}>{props.result} </div>
      <div className={styles.ScoreItemContent}>{props.date}</div>
    </div>
  );
};

export default ScoreItem;