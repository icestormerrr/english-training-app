import "./App.css";
import { useEffect, useState } from "react";
import WordService from "./API/WordService";
import { AppContext } from "./context";
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


  return (
    <AppContext.Provider
      value={{
        words,
        scoreList,
        setScoreList,
      }}
    >
      <Routes>
        <Route
          path="/"
          exact
          element={<Home isLoading={isLoading} />}
        />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
