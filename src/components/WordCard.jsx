import "../styles/App.css";
import React from "react";

const WordCard = (props) => {
  return (
    <div className="WordCard flex-center">
      {props.words[props.currentIndex].word}
    </div>
  );
};

export default WordCard;