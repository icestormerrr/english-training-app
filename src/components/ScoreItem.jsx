import React from "react";

const ScoreItem = (props) => {
  return (
    <div className="ScoreItem">
      <div className="ScoreItem__column flex-center">{props.place} </div>
      <div className="ScoreItem__column flex-center">{props.result} </div>
      <div className="ScoreItem__column flex-center">{props.date}</div>
    </div>
  );
};

export default ScoreItem;