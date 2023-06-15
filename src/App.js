import "./App.css";
import { useEffect, useState } from "react";
import WordService from "./API/WordService";
import { ScoreListContext } from "./context";
import shuffle from "./utils/shuffle";
import { LOCAL_STORAGE_KEY } from "./const";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Exercise from "./pages/Exercise/Exercise";

function App() {
  const [words, setWords] = useState([{ word: "", translate: "" }]);

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

  function shuffleWords() {
    const newWords = shuffle(words);
    setWords(newWords);
  }

  return (
    <ScoreListContext.Provider
      value={{
        scoreList,
        setScoreList,
      }}
    >
      <Routes>
        <Route
          path="/"
          exact
          element={<Home isLoading={isLoading} shuffleWords={shuffleWords} />}
        />
        <Route path="/exercise" element={<Exercise words={words} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ScoreListContext.Provider>
  );
}

export default App;
