import styles from "./Home.module.css";
import Loader from "../../ui/loader/Loader";
import ScoreList from "../../components/ScoreList/ScoreList";
import Button from "../../ui/button/Button";

const Home = ({navigate, isLoading}) => {
  function startExercise() {
    navigate("/exercise");
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