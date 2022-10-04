import TBox from "./TBox";
import DropMenu from "./DropMenu";

function Target({ left, top, check, chars }) {
  return (
    <div id="target">
      <TBox left={left} top={top} />
      <DropMenu left={left} top={top} check={check} chars={chars}/>
    </div>
  )
}

export default Target;