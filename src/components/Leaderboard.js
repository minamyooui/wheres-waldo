import { formatTime } from "./utils/utils";
import EndForm from "./EndForm";
import uniqid from "uniqid";

function Leaderboard ({ list, time, join, save }) {
  function genList() {
    const arr = list.map(e => {
      const time = formatTime(e.time);
      return  (
        <li key={uniqid()}>
          <div>
            <span>{e.name} </span>
            <span>{time}</span>
          </div>
        </li>
      )
    });
    return arr;
  }
  
  return (
    <div id="leaderboard">
      <div id="scores">
        <h2>High Scores</h2>
        <div id="list">
          <ol>
            {list.length > 0 &&
              genList()
            }
          </ol>
        </div>
      </div>
      <div id="p-score">
        <div id='score-info'>
          <span>Time: {formatTime(time)}</span>
        </div>
        {join && 
          <EndForm save={save} />
        }
      </div>
    </div>
  )
}

export default Leaderboard;