import "./App.css";
import { useEffect, useState } from "react";
import Button from "./ui/button/Button";
import WordService from "./API/WordService";
import Loader from "./ui/loader/Loader";
import WordExercise from "./components/WordExercise/WordExercise";
import { ScoreListContext } from "./context";
import ScoreList from "./components/ScoreList/ScoreList";
import shuffle from "./utils/shuffle";

function App() {
  const LOCAL_STORAGE_KEY = "LOCAL_STORAGE_KEY";
  const [words, setWords] = useState([{ word: "", translate: "" }]);
  const [isCounting, setIsCounting] = useState(false);
  const [scoreList, setScoreList] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  );
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchWords() {
      try {
        const words = await WordService.getAll();
        setWords(words);
      } catch (e) {
        alert(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWords();
  }, []);

  function startExercise() {
    setWords(shuffle(words));
    setIsCounting(true);
  }

  const handleCountingChange = (value) => {
    setIsCounting(value);
  };

  return (
    <ScoreListContext.Provider
      value={{
        scoreList,
        setScoreList,
      }}
    >
      <div className="app">
        {isLoading ? (
          <Loader />
        ) : (
          !isCounting && (
            <>
              <ScoreList />
              <Button onClick={startExercise}>Начать</Button>
            </>
          )
        )}
        {isCounting && (
          <WordExercise
            words={words}
            changeIsCounting={handleCountingChange}
          />
        )}
      </div>
    </ScoreListContext.Provider>
  );
}

export default App;