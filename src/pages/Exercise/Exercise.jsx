import styles from "./Exercise.module.css";
import WordExercise from "../../components/WordExercise/WordExercise";
const Exercise = () => {
  return (
    <div className={styles.container}>
      <WordExercise />
    </div>
  );
};

export default Exercise;