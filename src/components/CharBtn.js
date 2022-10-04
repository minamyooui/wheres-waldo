function CharBtn ({ name, check }) {

  function callCheck() {
    check(name);
  }
  return (
    <div className="charBtn" onClick={callCheck}>
      {name}
    </div>
  )
}

export default CharBtn;