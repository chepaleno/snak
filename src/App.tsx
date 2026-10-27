import { useEffect, useRef, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import LoseScreen from "./components/LoseScreen/LoseScreen";
import StartScreen from "./components/StartScreen/StartScreen";

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
  const [record, setRecord] = useState(0);
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
  // console.log(pause);
  // let speed = 500;
  // if (speed > 250) {
  //   speed = 500 - (moving.length - 3) * 20;
  // } else {
  //   speed = 250;
  // }

  let maxSpeed = 250;
  let startSpeed = 500;
  let speedUp = 20;
  // let boardBlock = 10;
  // let dieWall = 9

  if (difficulty === "easy") {
    maxSpeed = 300;
    startSpeed = 600;
    speedUp = 10;
    // boardBlock = 10;
    // dieWall = 9
  }
  if (difficulty === "medium") {
    maxSpeed = 150;
    startSpeed = 400;
    speedUp = 20;
    // boardBlock = 10;
    // dieWall = 9
  }
  if (difficulty === "hard") {
    maxSpeed = 80;
    startSpeed = 250;
    speedUp = 30;
    // boardBlock = 12;
    // dieWall = 11
  }

  const speed = Math.max(maxSpeed, startSpeed - (moving.length - 3) * speedUp);
  // console.log(speed);
  // console.log(lose || pause || !gameStart)
  useEffect(() => {
    if (lose || pause || !gameStart) {
      // console.log('qwe')
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
        // if (head[1] > dieWall) {
        //   setLose(true);
        // }
        if (newHead[1] < 0) {
          newHead = [newHead[0], boardBlock - 1];
        }
        if (newHead[0] < 0) {
          newHead = [boardBlock - 1, newHead[1]]
        }
        if (newHead[0] > dieWall) {
          newHead = [0, newHead[1]]
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
    // if (head[1] > dieWall) {
    //   setLose(true);
    // }
    // if (head[1] < 0) {
    //   setLose(true);
    // }
    // if (head[0] < 0) {
    //   setLose(true);
    // }
    // if (head[0] > dieWall) {
    //   setLose(true);
    // }

    const body = moving.slice(1);

    if (body.some((mas) => mas[0] === head[0] && mas[1] === head[1])) {
      setLose(true);
    }
  }, [direction, moving]);

  const score = moving.length - 3;

  useEffect(() => {
    const saved = localStorage.getItem("SnakeRecord");
    // console.log(Number(saved));
    setRecord(saved ? Number(saved) : 0);
  }, [lose]);

  useEffect(() => {
    // const save = [{score: score, id: Date.now().toString()}]
    // if (score > record) {
      localStorage.setItem("SnakeRecord", JSON.stringify([{score: score, id: Date.now().toString()}]));
    // }
  }, [lose]);

  let isMore = false;
  if (score > record) {
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
      <div className="interface">
        <div className="snakeGame">SnakeGame</div>
        <Board snake={moving} food={food} boardBlock={boardBlock} />
        <LoseScreen
          lose={lose}
          setLose={setLose}
          setMoving={setMoving}
          direction={direction}
          score={score}
        />
        <div>score: {score}</div>
        <div>record: {isMore ? score : record}</div>
      </div>
    </div>
  );
}

export default App;
