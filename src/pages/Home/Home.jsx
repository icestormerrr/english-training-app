import styles from "./Home.module.css";
import Loader from "../../ui/loader/Loader";
import ScoreList from "../../components/ScoreList/ScoreList";
import Button from "../../ui/button/Button";
import { useNavigate } from "react-router-dom";

const Home = ({ shuffleWords, isLoading }) => {
  const navigate = useNavigate();
  function startExercise() {
    navigate("/exercise");
    shuffleWords();
  }
  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ScoreList />
          <Button onClick={startExercise}>Начать</Button>
        </>
      )}
    </div>
  );
};

export default Home;
