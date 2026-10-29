import "./RecordBoard.css";
interface RecordBoardProps {
  record: { name: string; score: number }[];
}
const RecordBoard = (props: RecordBoardProps) => {
  const { record } = props;


  return (
    <div className="leaderboard">
      <h3 className="leaderBoardTitle">Leader Board</h3>
      <div className="leaderboard-list">
        {record.map((item, index) => (
          <div key={index} className="leaderboard-row">
            <span>{index + 1}</span>
            <span>{item.name}</span>
            <span>{item.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordBoard;
