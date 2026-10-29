import { useState, type RefObject } from "react";
import "./LoseScreen.css";

interface LoseScreenProps {
  lose: boolean;
  setLose: (value: boolean) => void;
  setMoving: (value: [number, number][]) => void;
  direction: RefObject<string>;
  score: number;
  setRecord: (value: { name: string; score: number }[]) => void;
  record: { name: string; score: number }[];
  setGameStart:(value: boolean) => void;
}

const LoseScreen = (props: LoseScreenProps) => {
  const { lose, setLose, setMoving, direction, score, setRecord, record, setGameStart } =
    props;
  const [playerName, setPlayerName] = useState("");

  const saveRecord = (playerName: string) => {
    const finalName = playerName ? playerName : "AAA";
    const newRecord = { name: finalName, score: score };
    const updatedRecord = [...record, newRecord];
    const finalRecord = updatedRecord
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setRecord(finalRecord);
    localStorage.setItem("record", JSON.stringify(finalRecord));
  };

  const restartClick = () => {
    setMoving([
      [5, 5],
      [5, 4],
      [5, 3],
    ]);

    direction.current = "RIGHT";

    setLose(false);
    saveRecord(playerName);
    setPlayerName("");
  };

  const mainMenuClick = () => {
    setMoving([
      [5, 5],
      [5, 4],
      [5, 3],
    ]);

    direction.current = "RIGHT";
    setLose(false);
    setGameStart(false)
    saveRecord(playerName);
    setPlayerName("");
  }

  return (
    <div className={`container ${lose ? "isVisible" : ""}`}>
      <div className="loseDiv">
        <h2 className="h2lose">GAME OVER</h2>
        <p>Твой счёт: {score}</p>
        <p className="input-label">Введи имя:</p>
        <input
          type="text"
          className="arcadeInput"
          maxLength={4}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
          placeholder="AAA"
        />
        <div className="buttons-group"> 
            <button className="LoseButton" onClick={restartClick}>RESTART</button>
            <button className="LoseButtonMenu" onClick={mainMenuClick}>MAIN MENU</button>
        </div>
      </div>
    </div>
  );
};

export default LoseScreen;
