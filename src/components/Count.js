import CountDrop from "./CountDrop";
import { getCount } from "./utils/utils";

function Count ({chars, dropHook}) {

  const [drop, setDrop] = dropHook;

  function handleClick () {
    if (drop) {
      setDrop(false);
      return;
    } 
    setDrop(true);
  }

  return (
    <div id="count">
      <div id="countBtn" onClick={handleClick}>
        {getCount(chars)}
      </div>
      {drop &&
        <CountDrop chars={chars}/>
      }
    </div>
  )
}

export default Count;