import "./styles/App.css";
import { useEffect, useState } from "react";
import MyButton from "./ui/button/MyButton";
import WordService from "./API/WordServise";
import MyLoader from "./ui/loader/MyLoader";
import WordExercise from "./components/WordExercise";
import { ScoreListContext } from "./context";
import ScoreList from "./components/ScoreList";
import * as ArrayMethods from "./utils/ArrayMethods";

function App() {
  const LOCAL_STORAGE_KEY = "LOCAL_STORAGE_KEY";
  const [words, setWords] = useState([{ word: "", translate: "" }]);
  const [isCounting, setIsCounting] = useState(false);
  const [scoreList, setScoreList] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  );
  const [isLoading, setIsLoading] = useState(true);

  async function getWordsFromServer() {
    try {
      const words = await WordService.getAll();
      setWords(words);
    } catch (e) {
      alert(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getWordsFromServer();
  }, []);

  function startExercise() {
    setWords(ArrayMethods.shuffle(words));
    setIsCounting(true);
  }

  return (
    <ScoreListContext.Provider
      value={{
        scoreList,
        setScoreList,
      }}
    >
      <div className="App flex-center">
        {isLoading ? (
          <MyLoader />
        ) : (
          !isCounting && (
            <>
              <ScoreList />
              <MyButton onClick={startExercise}>Начать</MyButton>
            </>
          )
        )}
        {isCounting && (
          <WordExercise
            words={words}
            isCounting={isCounting}
            stopTimer={setIsCounting}
            localStorageKey={LOCAL_STORAGE_KEY}
          />
        )}
      </div>
    </ScoreListContext.Provider>
  );
}

export default App;
