import CharDiv from "./CharDiv";

function CountDrop ({ chars }) {
  return (
    <div id="countDrop">
      {chars.map(e => <CharDiv char={e} />)}
    </div>
  )
}

export default CountDrop;