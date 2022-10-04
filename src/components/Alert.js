function Alert ({ alert }) {
  const msg = 
    alert.found ? `You found ${alert.name}!` : 'Keep Searching!';

  return (
    <div id="alert">
      {msg}
    </div>
  )
}

export default Alert;