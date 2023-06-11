import React, { useContext, useState } from "react";
import { ScoreListContext } from "../context";
import ScoreItem from "./ScoreItem";
import moment from "moment";

const ScoreList = (props) => {
  const { scoreList, setScoreList } = useContext(ScoreListContext);

  function parseDate(dateStr) {
    return moment(dateStr).format("DD.MM.YY HH:mm:ss");
  }

  return (
    <div className="ScoreList">
      {!scoreList?.length ? (
        <div className="flex-center">
          В таблице рекордов пока нет записей!
        </div>
      ) : (
        <>
          <ScoreItem place="Место" result="Счёт" date="Дата" />
          {scoreList.map((current, index) => {
            if (index === 5) {
              return (
                <>
                  <div>Последний результат</div>
                  <ScoreItem
                    place="..."
                    result={current.score}
                    date={parseDate(current.date)}
                  />
                </>
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

