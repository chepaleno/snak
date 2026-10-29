import "./StartScreen.css";

interface StartScreenProps {
  gameStart: boolean;
  difficulty: "easy" | "medium" | "hard";
  setGameStart: (value: boolean) => void;
  setDifficulty: (value: "easy" | "medium" | "hard") => void;
}

const StartScreen = (props: StartScreenProps) => {
  const { setGameStart, gameStart, difficulty, setDifficulty } = props;

  const StartGame = () => {
    setGameStart(true);
  };

  return (
    <div className={`container ${gameStart ? "" : "isVisible"}`}>
      <div className="winDiv">
        <h2 className="h2">SNAKE GAME</h2>
        <br />
        Выберите уровень сложности:
        <div className="difficulty-group">
          <button
            className={`difficulty-btn ${difficulty === "easy" ? "active" : ""}`}
            onClick={() => setDifficulty("easy")}
          >
            EASY
          </button>
          <button
            className={`difficulty-btn ${difficulty === "medium" ? "active" : ""}`}
            onClick={() => setDifficulty("medium")}
          >
            MEDIUM
          </button>
          <button
            className={`difficulty-btn ${difficulty === "hard" ? "active" : ""}`}
            onClick={() => setDifficulty("hard")}
          >
            HARD
          </button>
        </div>
        <span className="autor">
          <br />
          made by: Микро Ивашка
        </span>
        <button className="StartButton" onClick={StartGame}>
          START
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
