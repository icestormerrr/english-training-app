import "./App.css";
import { useEffect, useState } from "react";
import WordService from "./API/WordService";
import { ScoreListContext } from "./context";
import shuffle from "./utils/shuffle";
import { LOCAL_STORAGE_KEY } from "./const";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home/Home";
import Exercise from "./pages/Exercise/Exercise";

function App() {
  const [words, setWords] = useState([{ word: "", translate: "" }]);
  const navigate = useNavigate();
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
  }

  return (
    <ScoreListContext.Provider
      value={{
        scoreList,
        setScoreList,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={<Home navigate={navigate} isLoading={isLoading} />}
          />
          <Route
            path="/exercise"
            exact
            element={<Exercise navigate={navigate} words={words} />}
          />
          <Navigate to="/"/>
        </Routes>
      </BrowserRouter>
    </ScoreListContext.Provider>
  );
}

export default App;
