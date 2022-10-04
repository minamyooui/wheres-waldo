function LoadMenu ({ start }) {
  function start1 () {
    start(1);
  }

  function start2() {
    start(2);
  }

  return (
    <div id="overlay">
      <div id="menu-wrap">
        <div id="menu-heading">
          Choose Map
        </div>
        <div id="menu">
          <div className="menu-wrap">
            <div id="normal" className="menu-half">
              <button onClick={start1}>Normal</button>
            </div>
          </div>
          <div className="menu-wrap">
            <div id="hard" className="menu-half">
              <button onClick={start2}>Hard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadMenu;