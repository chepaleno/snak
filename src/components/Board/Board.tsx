import "./Board.css";

interface BoardProps {
  snake: [number, number][];
  food: [number, number];
}

const Board = (props: BoardProps) => {
  const { snake, food } = props;
  const head = snake[0];

  let boardCells = [];
  for (let row = 0; row < 10; row++) {
    let boardRow = [];
    for (let col = 0; col < 10; col++) {
      const isHead = row === head[0] && col === head[1];
      const isFood = row === food[0] && col === food[1];
      const isSnake = snake.some(([r, c]) => r === row && c === col);
      boardRow.push(
        <div
          className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""} ${isHead ? "head" : ""}`}
          key={`${row}-${col}`}
        ></div>,
      );
    }
    boardCells.push(
      <div className="row" key={row}>
        {boardRow}
      </div>,
    );
  }

  return (
    <div>
      <div className="board">{boardCells}</div>
    </div>
  );
};
export default Board;
