import React, { useContext } from "react";
import { AppContext } from "../../context";
import ScoreItem from "../ScoreItem/ScoreItem";
import styles from "./ScoreList.module.css"
import { TOP_RESULT_COUNT } from "../../const";
import parseDate from "../../utils/parseDate";

const ScoreList = () => {
  const { scoreList } = useContext(AppContext);

  return (
    <div className={styles.container}>
      {!scoreList?.length ? (
        <div className={styles.flexCenter}>
          В таблице рекордов пока нет записей!
        </div>
      ) : (
        <>
          <ScoreItem place="Место" result="Счёт" date="Дата" />
          {scoreList.map((current, index) => {
            if (index === TOP_RESULT_COUNT) {
              return (
                <div className={styles.flexCenter} key={current.date}>
                  <div>Последний результат</div>
                  <ScoreItem
                    place="..."
                    result={current.score}
                    date={parseDate(current.date)}
                  />
                </div>
              );
            }
            return (
              <ScoreItem
                key={current.date}
                place={index + 1}
                result={current.score}
                date={parseDate(current.date)}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ScoreList;

