import React, { useContext } from "react";
import { ScoreListContext } from "../../context";
import ScoreItem from "../ScoreItem/ScoreItem";
import styles from "./ScoreList.module.css"
import moment from "moment";

const ScoreList = () => {
  const { scoreList } = useContext(ScoreListContext);

  function parseDate(dateStr) {
    return moment(dateStr).format("DD.MM.YY HH:mm:ss");
  }

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
            if (index === 5) {
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

