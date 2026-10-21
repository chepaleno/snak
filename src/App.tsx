import { useEffect, useRef, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import LoseScreen from "./components/LoseScreen/LoseScreen";

function App() {
  // const record = JSON.parse(localStorage.getItem('SnakeRecord') ?? '0')
  // const finRecord = Number(record)

  // const [record, setRecord] = useState(() => {
  //   const savedRecord = localStorage.getItem("SnakeRecord");
  //   console.log(savedRecord)
  //   if (savedRecord) {
  //     return JSON.parse(savedRecord);
  //   }

  //   return [{ id: "1", record: 0 }];
  // });
  const [lose, setLose] = useState<boolean>(false);
  const snake: [number, number][] = [
    [5, 5],
    [5, 4],
    [5, 3],
  ];
  const [food, setFood] = useState<[number, number]>([
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ]);
  const [moving, setMoving] = useState(snake);
  const [record, setRecord] = useState(0);
  const direction = useRef<string>("RIGHT");
  useEffect(() => {
    const pressedButton = (e: KeyboardEvent) => {
      if (
        (e.key === "d" || e.key === "D" || e.key === "в" || e.key === "В") &&
        direction.current !== "LEFT"
      ) {
        direction.current = "RIGHT";
      }
      if (
        (e.key === "s" || e.key === "S" || e.key === "ы" || e.key === "Ы") &&
        direction.current !== "UP"
      ) {
        direction.current = "DOWN";
      }
      if (
        (e.key === "a" || e.key === "A" || e.key === "ф" || e.key === "Ф") &&
        direction.current !== "RIGHT"
      ) {
        direction.current = "LEFT";
      }
      if (
        (e.key === "w" || e.key === "W" || e.key === "ц" || e.key === "Ц") &&
        direction.current !== "DOWN"
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
    if (lose) {
      return;
    }
    let timerId = setInterval(() => {
      setMoving((prev) => {
        const head = prev[0];

        let newHead: [number, number] = [head[0], head[1]];

        if (direction.current === "RIGHT") newHead = [head[0], head[1] + 1];
        if (direction.current === "DOWN") newHead = [head[0] + 1, head[1]];
        if (direction.current === "LEFT") newHead = [head[0], head[1] - 1];
        if (direction.current === "UP") newHead = [head[0] - 1, head[1]];

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setFood([
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
          ]);
          return [newHead, ...prev];
        } else {
          return [newHead, ...prev.slice(0, -1)];
        }
      });
    }, 500);

    return () => clearInterval(timerId);
  }, [direction, moving]);

  useEffect(() => {
    const head = moving[0];
    if (head[1] > 9) {
      setLose(true);
    }
    if (head[1] < 0) {
      setLose(true);
    }
    if (head[0] < 0) {
      setLose(true);
    }
    if (head[0] > 9) {
      setLose(true);
    }

    const body = moving.slice(1);

    if (body.some((mas) => mas[0] === head[0] && mas[1] === head[1])) {
      setLose(true);
    }
  }, [direction, moving]);

  const score = moving.length - 3;

  useEffect(() => {
    const saved = localStorage.getItem("SnakeRecord");
    console.log(Number(saved));
    setRecord(saved ? Number(saved) : 0);
  }, [lose]);

  useEffect(() => {
    if (score > record) {
      localStorage.setItem("SnakeRecord", String(score));
    }
  }, [lose]);

  let isMore = false;
  if (score > record) {
    isMore = true;
  }

  // console.log(score);

  // const addRecord = () => {
  //   const newRecord = {
  //     id: Date.now().toString(),
  //     score: { score },
  //   };
  //   setRecord([...record, newRecord]);
  // };

  // const record = localStorage.getItem("SnakeRecord");

  // console.log(Boolean(record));
  // const finRec = JSON.parse(record);
  // let newArr = [];
  // useEffect(() => {
  //   if (record) {
  //     for (let i = 0; i < finRec.length; i++) {
  //       // console.log(finRec[i].score.score)
  //       newArr.push(finRec[i].score.score);
  //       console.log(newArr);
  //       // newArr.map(obj => parseInt(obj.value))
  //       // console.log(newArr)
  //     }
  //     setAbsoluteRec(Math.max(...newArr));
  //     console.log(absoluteRec);
  //   }
  // }, [lose, record, moving]);

  // console.log(localStorage.getItem("SnakeRecord"))

  return (
    <div className="backGround">
      <div className="interface">
        <div className="snakeGame">SnakeGame</div>
        <Board snake={moving} food={food} />
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
