import Timer from "./Timer";
import Count from "./Count";

function Nav ({ chars, start, dropHook, sendTime }) {

  function refresh() {
    window.location.reload();
  }
  
  return (
    <div id="nav">
      <div id='heading' onClick={refresh}>
        <h1>Where's X?</h1>
      </div>
      <Timer chars={chars} start={start} sendTime={sendTime}/>
      <Count chars={chars} dropHook={dropHook}/>
    </div>
  )
}

export default Nav;