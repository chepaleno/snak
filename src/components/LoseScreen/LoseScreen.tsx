import type { RefObject } from "react";
import "./LoseScreen.css";
// import { ClickerContext } from "../../context/ClickerContext";

interface LoseScreenProps {
  lose: boolean;
  setLose: (value: boolean) => void;
  setMoving: (value: [number, number][]) => void;
  direction: RefObject<string>;
  score: number;
  // addRecord:
}

const LoseScreen = (props: LoseScreenProps) => {
  const { lose, setLose, setMoving, direction, score } = props;
  // const [record, setRecord] = useState(() => {
  //   const savedRecord = localStorage.getItem("SnakeRecord");
  //   if (savedRecord) {
  //     return JSON.parse(savedRecord);
  //   }
  //   return [{ id: Date.now().toString(), score: { score } }];
  // });

  // [
  //   { id: Date.now().toString(), score: { score } },
  // ]);
  // console.log(record);
  // const [isVisible, setIsVisible] = useState(false);
  //   const { bossCount, setFreeMod } = useContext(ClickerContext);
  //   useEffect(() => {
  //     requestAnimationFrame(() => setIsVisible(true));
  //   }, []);
  //   let finalFraza = "крабий батя.";
  //   if (bossCount >= 3) {
  //     finalFraza =
  //       "... а нет, батю ты пустил на крабовый салат.(это было опционально)";
  //   }

  // const addRecord = () => {
  //   const newRecord = {
  //     id: Date.now().toString(),
  //     score: { score },
  //   };
  //   setRecord([...record, newRecord]);
  // };
  const restartClick = () => {
    // addRecord();
    setMoving([
      [5, 5],
      [5, 4],
      [5, 3],
    ]);

    direction.current = "RIGHT";

    setLose(false);
  };

  // useEffect(() => {
  //   localStorage.setItem("SnakeRecord", JSON.stringify(record));
  // }, [lose]);

  return (
    <div className={`container ${lose ? "isVisible" : ""}`}>
      <div className="winDiv">
        <h2 className="h2">GAME OVER</h2>
        <p>Твой счёт: {score}</p>
        <br />В любом случае спасибо за игру!!!
        <span className="autor">
          <br />
          made by: Микро Ивашка
        </span>
        <button className="LoseButton" onClick={restartClick}>
          RESTART
        </button>
      </div>
    </div>
  );
};

export default LoseScreen;
