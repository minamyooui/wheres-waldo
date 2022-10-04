import CharBtn from "./CharBtn";
import uniqid from "uniqid";

function DropMenu ({ left, top, check, chars }) {
  return (
    <div id="dropMenu"
    style={{
      left: left + 55 + 'px',
      top: top + 'px',
    }}>
      {chars.map(e => {
        if (!e.found) return <CharBtn key={uniqid()} name={e.name} check={check}/>
      })}
    </div>
  )
}

export default DropMenu;