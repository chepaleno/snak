import { useEffect, useRef, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import LoseScreen from "./components/LoseScreen/LoseScreen";
import StartScreen from "./components/StartScreen/StartScreen";
import RecordBoard from "./components/RecordBoard/RecordBoard";

const getRandomFood = (
  snake: [number, number][],
  size: number,
): [number, number] => {
  while (true) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);

    const isInSnake = snake.some(([r, c]) => r === row && c === col);

    if (!isInSnake) {
      return [row, col];
    }
  }
};

function App() {
  const [record, setRecord] = useState(() => {
    const savedRecord = localStorage.getItem("record");
    if (savedRecord) {
      return JSON.parse(savedRecord);
    }

    return [{ name: "чип", score: 32 }];
  });
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium",
  );
  const [lose, setLose] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);

  const boardBlock = difficulty === "hard" ? 12 : 10;
  const dieWall = boardBlock - 1;

  const snake: [number, number][] = [
    [5, 5],
    [5, 4],
    [5, 3],
  ];

  const [food, setFood] = useState<[number, number]>(
    getRandomFood(snake, boardBlock),
  );
  const [moving, setMoving] = useState(snake);
  const direction = useRef<string>("RIGHT");
  const lastMovedDirection = useRef<string>("RIGHT");
  useEffect(() => {
    const pressedButton = (e: KeyboardEvent) => {
      if (
        (e.key === "d" || e.key === "D" || e.key === "в" || e.key === "В") &&
        lastMovedDirection.current !== "LEFT"
      ) {
        direction.current = "RIGHT";
      }
      if (
        (e.key === "s" || e.key === "S" || e.key === "ы" || e.key === "Ы") &&
        lastMovedDirection.current !== "UP"
      ) {
        direction.current = "DOWN";
      }
      if (
        (e.key === "a" || e.key === "A" || e.key === "ф" || e.key === "Ф") &&
        lastMovedDirection.current !== "RIGHT"
      ) {
        direction.current = "LEFT";
      }
      if (
        (e.key === "w" || e.key === "W" || e.key === "ц" || e.key === "Ц") &&
        lastMovedDirection.current !== "DOWN"
      ) {
        direction.current = "UP";
      }
    };
    window.addEventListener("keydown", pressedButton);

    return () => {
      window.removeEventListener("keydown", pressedButton);
    };
  }, []);

  useEffect(() => {
    const pressedPause = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        setPause((prev) => !prev);
      }
    };
    window.addEventListener("keydown", pressedPause);

    return () => {
      window.removeEventListener("keydown", pressedPause);
    };
  }, []);

  let maxSpeed = 250;
  let startSpeed = 500;
  let speedUp = 20;

  if (difficulty === "easy") {
    maxSpeed = 300;
    startSpeed = 600;
    speedUp = 10;
  }
  if (difficulty === "medium") {
    maxSpeed = 150;
    startSpeed = 400;
    speedUp = 20;
  }
  if (difficulty === "hard") {
    maxSpeed = 80;
    startSpeed = 250;
    speedUp = 30;
  }

  const speed = Math.max(maxSpeed, startSpeed - (moving.length - 3) * speedUp);
  useEffect(() => {
    if (lose || pause || !gameStart) {
      return;
    }
    let timerId = setInterval(() => {
      lastMovedDirection.current = direction.current;
      setMoving((prev) => {
        const head = prev[0];

        let newHead: [number, number] = [head[0], head[1]];

        if (direction.current === "RIGHT") newHead = [head[0], head[1] + 1];
        if (direction.current === "DOWN") newHead = [head[0] + 1, head[1]];
        if (direction.current === "LEFT") newHead = [head[0], head[1] - 1];
        if (direction.current === "UP") newHead = [head[0] - 1, head[1]];

        if (newHead[1] > boardBlock - 1) {
          newHead = [newHead[0], 0];
        }
        if (newHead[1] < 0) {
          newHead = [newHead[0], boardBlock - 1];
        }
        if (newHead[0] < 0) {
          newHead = [boardBlock - 1, newHead[1]];
        }
        if (newHead[0] > dieWall) {
          newHead = [0, newHead[1]];
        }

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood(getRandomFood(prev, boardBlock));
          return [newHead, ...prev];
        } else {
          return [newHead, ...prev.slice(0, -1)];
        }
      });
    }, speed);

    return () => clearInterval(timerId);
  }, [food, lose, pause, gameStart, boardBlock]);

  useEffect(() => {
    const head = moving[0];
    const body = moving.slice(1);

    if (body.some((mas) => mas[0] === head[0] && mas[1] === head[1])) {
      setLose(true);
    }
  }, [direction, moving]);

  const score = moving.length - 3;

  let isMore = false;
  if (score > record[0].score) {
    isMore = true;
  }

  return (
    <div className="backGround">
      <StartScreen
        setGameStart={setGameStart}
        gameStart={gameStart}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <LoseScreen
        lose={lose}
        setLose={setLose}
        setMoving={setMoving}
        direction={direction}
        score={score}
        setRecord={setRecord}
        record={record}
        setGameStart={setGameStart}
      />
      <div className="containerGame">
        <div className="interface">
          <div className="snakeGame">SnakeGame</div>
          <Board snake={moving} food={food} boardBlock={boardBlock} />

          <div>score: {score}</div>
          <div>record: {isMore ? score : record[0].score}</div>
        </div>
        <RecordBoard record={record}/>
      </div>
    </div>
  );
}

export default App;
